import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  render() {
    return (
      <div>
        <SearchBar updateFilter={this.props.updateFilter}
         filterBy={this.props.filterBy}
         updateSort={this.props.updateSort}
         sortBy={this.props.sortBy}/>

          <div className="row">
            <div className="col-8">
            
              <StockContainer stockList={this.props.stockList} 
              addToPortfolio={this.props.addToPortfolio}/>

            </div>
            <div className="col-4">

              <PortfolioContainer portfolioList={this.props.portfolioList}
              removeFromPortfolio={this.props.removeFromPortfolio}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
