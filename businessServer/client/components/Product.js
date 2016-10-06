import React from 'react';
import { Link } from 'react-router';

const Product = React.createClass({
  addProduct: function(e){
    var name = this.refs.productname.value;
    this.props.addProductAction(name);

  },
  // addNewAnswer: function(e){
  //  // {answers}.push(this.refs.answer.value)
  //  console.log(this.refs.answer.value);
  //  e.preventDefault();
  // },
  // addNewNode: function(e){
  //  console.log('second');
  //  e.preventDefault();

  // },
  render: function(){

    const productDiv = this.props.product.map((product, i) => {
      return (
        <div className="product-box" key={i}>
          <Link to={'/layers'}>
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
