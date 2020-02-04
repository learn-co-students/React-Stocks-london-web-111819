import React, { Component } from 'react';
import Header from './components/Header'
import MainContainer from './containers/MainContainer'
import PortfolioContainer from './containers/PortfolioContainer'
import SearchBar from './components/SearchBar';

const by = prop => {
  const sorter = (a, b) => {
    if(prop) {
      a=a[prop]
      b=b[prop]
    }
    if (a > b) return 1
    if (a < b) return -1
    return 0
  }
  sorter.descending = (a, b) => 0 - sorter(a, b)
  return sorter
}

class App extends Component {

  state = {
    stockList: [],
    portfolioList: [],
    filterBy: 'All',
    sortBy: 'Alphabetically'
  }

  updateFilter = (e) => {
    this.setState({filterBy: e.target.value})
  }

  updateSort = e => {
    this.setState({
      sortBy: e.target.value
    })
  }

  addToPortfolio = stock => {
    if (this.state.portfolioList.includes(stock)) return //this statement only allows one click of each
    this.setState({                                      
      portfolioList: [...this.state.portfolioList, stock]
    })
  }

  removeFromPortfolio = stockToRemove => {
    const updatedPortfolioList = this.state.portfolioList.filter(stock => stock.id !== stockToRemove.id)
    this.setState({
    portfolioList: updatedPortfolioList
    })
  }

  getFilteredStocks = stockList => {
    return this.state.filterBy === "All"
    ? stockList
    : stockList.filter(stock => stock.type === this.state.filterBy)
  }

  getSortedStocks = stockList => {
    if (this.state.sortBy === "Alphabetically") {
      return [...stockList].sort(by('name'))
    }
    if (this.state.sortBy === "Price") {
      return [...stockList].sort(by('price'))
    }
  }

  componentDidMount() {
   fetch('http://localhost:3000/stocks')
   .then(resp => resp.json())
    .then(stocks => {this.setState({
      stockList: stocks
    })
   })
  }


  render() {
    const filteredStocks = this.getFilteredStocks(this.state.stockList)
    const sortedStocks = this.getSortedStocks(filteredStocks)
    return (
      <div>
        <Header/>
        <MainContainer
          stockList={sortedStocks}
          addToPortfolio={this.addToPortfolio}
          portfolioList={this.state.portfolioList}
          removeFromPortfolio={this.removeFromPortfolio}
          updateFilter={this.updateFilter}
          filterBy={this.state.filterBy} //passing state
          updateSort={this.updateSort} //passing a function
          sortBy={this.state.sortBy}
        />
        
      </div>
    );
  }
}

export default App;
