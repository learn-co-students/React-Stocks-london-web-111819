import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  renderStocks = () => {
    if(this.props.stocks && this.props.filteredStocksBy) {
      return this.props.stocks.filter(stock => stock.type === this.props.filteredStocksBy).map( stock => <Stock purchaseStock={this.props.purchaseStock} stock={stock} />)
    } else {
      return this.props.stocks.map( stock => <Stock purchaseStock={this.props.purchaseStock} stock={stock} /> )
    }
  }

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {
          this.renderStocks()
        }
      </div>
    );
  }

}

export default StockContainer;
