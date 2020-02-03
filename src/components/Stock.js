import React from 'react'

class Stock extends React.Component {
// const Stock = (props) => (

render() {
  return (
  <div>

    <div className="card" onClick={()=>this.props.decideAction(this.props.stock)}>
      <div className="card-body">
        <h5 className="card-title">{
            //Company Name
            this.props.stock.name
          }</h5>
        <p className="card-text">{
            //ticker: stock price
            this.props.stock.price
        } - {this.props.stock.type}</p>
      </div>
    </div>


  </div>
  )
};
}

export default Stock
