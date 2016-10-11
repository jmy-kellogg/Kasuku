import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Layers from './Layers';

const Product = React.createClass({
  getInitialState: function(){
    return {showLayers: false}
  },
  onClick: function(product){
    this.setState({showLayers: true})
    this.props.setSelectedProduct(product.id);
  },

  addProduct: function(e){
    var name = this.refs.productname.value;

    // var productId = 1;
    // this.props.product.forEach(prod => {
    //   if(prod.id > productId){
    //     productId = prod.id + 1;
    //   }
    // })

    this.props.addProductAction(name);

  },
  render: function(){
    const productDiv = this.props.product.map((product, i) => {
      return (
        <div className="product-box" key={i} onClick={this.onClick.bind(this, product)}>
          {product.id}
        </div>
      )
    })
    return (
      <div className="productPage">
        <div>
          <h1>Your Products</h1>
        </div>
        <div>
          {productDiv}
        </div>
        <div>
          <input ref="productname" name="productname"/>
          <button onClick={this.addProduct}>add</button>

        </div>
        {this.state.showLayers ? <Layers {...this.props}/> : null }

      </div>
    )
  }
});

export default Product

// <Link to={`/layers/${product.id}`}>
