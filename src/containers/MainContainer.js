import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    availableStocksToBuy: [],
    stocksInPortfolio: [],
    stocksToBeSortedBy: '',
    stocksToBeFilteredBy: 'Tech'
  }

  onChangeSortBy = (stocksToBeSortedBy) => this.setState({stocksToBeSortedBy})

  onChangeFilter = (stocksToBeFilteredBy) => this.setState({stocksToBeFilteredBy})

  componentDidMount(){this.getAvailableStocks()}

  getAvailableStocks = () => {
    return fetch('http://localhost:3000/stocks/')
      .then(object => object.json())
      .then(data => {this.setState({ availableStocksToBuy: data})})
  }

  stocksToPresent = () => {
    //STEP-1: Filter
    let resultSet = [...this.state.availableStocksToBuy].filter(stock=>stock.type===this.state.stocksToBeFilteredBy)
    //STEP-2: Sort
    if (this.state.stocksToBeSortedBy==='Alphabetically') {
      return resultSet.sort((a,b)=>(a.name > b.name) ? 1 : -1)
    } else if (this.state.stocksToBeSortedBy==='Price') {
      return resultSet.sort((a,b)=>(a.price > b.price)? 1 : -1)
    } else {
      return resultSet
    }
  }

  decideAction = (receivedStock) => {
    if (this.state.availableStocksToBuy.filter(item=>item.id===receivedStock.id).length !== 0) {
      this.addStockToPortfolio(receivedStock)
    } else {
      this.removeStockFromPortfolio(receivedStock)
    }
  } 

  addStockToPortfolio = (receivedStock) => {
    //STEP-1: Remove stock from available stocks
    let indexOfReceivedStock = this.state.availableStocksToBuy.indexOf(receivedStock)
    let updatedAvailableStocksToBuy = [...this.state.availableStocksToBuy]
    updatedAvailableStocksToBuy.splice(indexOfReceivedStock,1)
    this.setState({ availableStocksToBuy: updatedAvailableStocksToBuy })
    // STEP-2: Add to portfolio
    let updatedPortfolio = [...this.state.stocksInPortfolio,receivedStock]
    this.setState({ stocksInPortfolio: updatedPortfolio })
  }

  removeStockFromPortfolio = (receivedStock) => {
    //STEP-1: Remove stock from portfolio
    let indexOfReceivedStock = this.state.stocksInPortfolio.indexOf(receivedStock)
    let updatedPortfolio = [...this.state.stocksInPortfolio]
    updatedPortfolio.splice(indexOfReceivedStock,1)
    this.setState({stocksInPortfolio:updatedPortfolio})
    //STEP-2: Add Stock to available stocks
    let updatedAvailableStocksToBuy = [...this.state.availableStocksToBuy]
    updatedAvailableStocksToBuy.push(receivedStock)
    this.setState({availableStocksToBuy:updatedAvailableStocksToBuy})
  }

  render() {
    return (
      <div>
        <SearchBar
        onChangeSortBy={this.onChangeSortBy}
        onChangeFilter={this.onChangeFilter}
        currentSortBy={this.state.stocksToBeSortedBy}
        currentFilterBy={this.state.stocksToBeFilteredBy}
        />
          <div className="row">
            <div className="col-8">
              <StockContainer
              decideAction={this.decideAction}
              stocksToPresent={this.stocksToPresent()}
              />
            </div>
            <div className="col-4">
              <PortfolioContainer 
              decideAction={this.decideAction}
              stocksInPortfolio={this.state.stocksInPortfolio}
              />
            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
