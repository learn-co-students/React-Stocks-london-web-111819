import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  renderPurchasedStocks = () => {
    if (this.props.purchasedStock.length > 0) {
      return this.props.purchasedStock.map( stock => <Stock stock={stock} sellStock={this.props.sellStock} />)
    }
  }

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {
            this.renderPurchasedStocks()
          }
      </div>
    );
  }

}

export default PortfolioContainer;
