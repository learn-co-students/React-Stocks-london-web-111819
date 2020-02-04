import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

const baseUrl = 'http://localhost:3000/stocks'

class MainContainer extends Component {

  state = {
    stocks: [],
    portfolio: [],
    filterBy: 'Tech',
    sortBy: 'Price'
  }

  getStocks = (url) => {
    return fetch(url)
    .then(resp => resp.json())
  }

  componentDidMount = () => {
    this.getStocks(baseUrl)
    .then(list => this.setState({
      stocks: list
    }))
  }

 addStockToPortfolio = (stockToAdd) => {
   if (this.state.portfolio.includes(stockToAdd)) return
   this.setState({portfolio:[...this.state.portfolio, stockToAdd]})
 }

 removeStockFromPortfolio =(stockToRemove) => {
   this.setState({
     portfolio: [...this.state.portfolio].filter(stock => stock.id !== stockToRemove.id)
   })
 }

 updateSortBy = (e) => {
  this.setState({
    sortBy: e.target.value
  })
 }

 updateFilterBy = (e) => {
  this.setState({
    filterBy: e.target.value
  })
 }

 filterStocks = (stocks) => {
   return stocks.filter(stock => stock.type === this.state.filterBy)
 }

 sortStocks = (stocks) => { 
   if(this.state.sortBy === 'Price'){
     return stocks.sort((a,b) => (a.price > b.price) ? 1 : ((b.price> a.price) ? -1 : 0))
   }
  if(this.state.sortBy === 'Alphabetically'){
    return stocks.sort((a,b) => (a.name > b.name) ? 1 : ((b.name> a.name) ? -1 : 0))
  }
  
 }

  render() {
    const filteredStocks = this.filterStocks(this.state.stocks)
    const sortedStocks = this.sortStocks(filteredStocks)
    return (
      <div>
        <SearchBar 
          updateSortBy={this.updateSortBy}
          updateFilterBy={this.updateFilterBy}
          sortBy={this.state.sortBy}
          />

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={sortedStocks} addStockToPortfolio={this.addStockToPortfolio}/>

            </div>
            <div className="col-4">

              <PortfolioContainer portfolioStocks={sortedStocks} removeStockFromPortfolio={this.removeStockFromPortfolio}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
