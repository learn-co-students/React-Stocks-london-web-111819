import React, { Component } from 'react';


class PortfolioContainer extends Component {

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
        {this.props.portfolioList.map(stock => 
          <div onClick={() => this.props.removeFromPortfolio(stock)}>

            <div className="card">
              <div className="card-body">
               <h5 className="card-title">{
                 stock.name

               }</h5>
             <p className="card-text">
                {stock.ticker}: {stock.price}
             </p>
           </div>
          </div>
      </div>
        ) }
      </div>
    )
}

}

export default PortfolioContainer;
