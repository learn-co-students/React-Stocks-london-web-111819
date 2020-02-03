import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    stocks: [],
    purchasedStock: [],
    filteredStocksBy: null
  }

  componentDidMount() {
    return fetch('http://localhost:3000/stocks')
      .then(resp => resp.json())
      .then(data => this.setState({stocks: data}))
  }

  purchaseStock = (stock) => {
    let stocks = this.state.purchasedStock.concat(stock)
    this.setState({
      purchasedStock: stocks
    })
  }

  sellStock = (stock) => {
    let stocks = this.state.purchasedStock.splice(this.state.purchasedStock.indexOf(stock), 1)
    this.setState({
      purchasedStock: this.state.purchasedStock
    })
  }

  filterStocksByType = (e) => {
    this.setState({
      filteredStocksBy: e.target.value
    })
  }

  render() {
    return (
      <div>
        <SearchBar filterStocksByType={this.filterStocksByType} />

          <div className="row">
            <div className="col-8">

              <StockContainer filteredStocksBy={this.state.filteredStocksBy} stocks={this.state.stocks} purchaseStock={this.purchaseStock} />

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.state.stocks} purchasedStock={this.state.purchasedStock} sellStock={this.sellStock} />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
