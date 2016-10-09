import React from 'react';
import { Link } from 'react-router';

const Product = React.createClass({

  addProduct: function(e){
    var name = this.refs.productname.value;
    var productId = 1;
    this.props.product.forEach(prod => {
      if(prod.id > productId){
        productId = prod.id + 1;
      }
    })

    this.props.addProductAction(name, productId);


  },
  render: function(){

    const productDiv = this.props.product.map((product, i) => {
      return (
        <div className="product-box" key={i}>
          <Link to={`/layers/${product.id}`}>
          {product.name}
          </Link>
        </div>
      )
    })
    return (
      <div>
        <div>
          {productDiv}
        </div>
        <div>
          <input ref="productname" name="productname"/>
          <button onClick={this.addProduct}>add</button>

        </div>

      </div>
    )
  }
});

export default Product
