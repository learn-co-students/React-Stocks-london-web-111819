import React, { Component } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "../components/SearchBar";

class MainContainer extends Component {
    state = {
        stocks: [],
        portfolioStocks: [],
        filterBy: "none"
    };

    getStocks = () => {
        fetch("http://localhost:3000/stocks")
            .then(resp => resp.json())
            .then(stocks => this.setState({ stocks }));
    };

    getFilteredStocks = stocksToFilter => {
        return this.state.filterBy === "none"
            ? stocksToFilter
            : stocksToFilter.filter(
                  stocks => stocks.type === this.state.filterBy
              );
    };

    componentDidMount() {
        this.getStocks();
    }

    handleChange = event => {
        this.setState({ filterBy: event.target.value });
    };

    handleBuy = stockToAdd => {
        if (this.state.portfolioStocks.includes(stockToAdd)) {
            return;
        } else {
            const updatePortfolioStocks = [
                stockToAdd,
                ...this.state.portfolioStocks
            ];
            this.setState({ portfolioStocks: updatePortfolioStocks });
        }
    };

    handleSell = stockToRemove => {
        const updatePortfolioStocks = [...this.state.portfolioStocks].filter(
            stock => stock.id !== stockToRemove.id
        );
        this.setState({ portfolioStocks: updatePortfolioStocks });
    };

    render() {
        const stocks = this.state.stocks;
        const filteredStocks = this.getFilteredStocks(stocks);
        const portfolioStocks = this.state.portfolioStocks;

        return (
            <div>
                <SearchBar
                    filterBy={this.state.filterBy}
                    handleChange={this.handleChange}
                />

                <div className="row">
                    <div className="col-8">
                        <StockContainer
                            stocks={filteredStocks}
                            handleClick={this.handleBuy}
                        />
                    </div>
                    <div className="col-4">
                        <PortfolioContainer
                            portfolioStocks={[...portfolioStocks]}
                            handleClick={this.handleSell}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default MainContainer;
