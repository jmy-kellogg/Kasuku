import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import InlineEdit from './InlineEdit';
import classNames from 'classnames';

import Modal from './Modal';

const Product = React.createClass({


  getInitialState: function(){
    return {
      showLayers: false,
      showGreetingNode: false,
      currentProduct: false
    }
  },
  selectProduct: function(product, e){
    this.setState({showLayers: true});
    this.props.setSelectedProduct(product.id);
    this.state.currentProduct = product.id;
  },


  addProduct: function(e){
    var answer = this.refs.productname.value;
    // var price = +this.refs.price.value;
    // var description = this.refs.description.value;
    var price = null;
    var description = null;

    this.refs.productname.value = "";
    var businessId = this.props.params.businessId;
    axios.post('/api/connections/', {
      answer: answer,
      fromId: null,
      // if fromId is null, must be product
      productId: null,
      businessId,
      price,
      description
    })
    .then(conn => conn.data)
    .then(conn => {
      axios.put(`/api/connections/${conn.id}`, {
        productId: conn.id
      })
        .then(res => res.data)
        .then(updatedConn => {
          // addProductAction(id, answer, fromId, businessId=null, price=null, description=null)
          this.props.addProductAction(conn.id, answer, null, businessId, price, description, conn.id);
        })
    })
    .catch(err => {
      if(err) throw err;
    })

    e.preventDefault();

  },
  render: function(){
    const productDiv = this.props.product.map((product, i) => {
      let divClassName = classNames({
        "product-box": true,
        "hightlight": this.state.currentProduct === product.id
      });
      return (

        <div className={divClassName} key={i} onClick={this.selectProduct.bind(this, product)}>
           <h4>{product.name}</h4>
        </div>


      )
    })
    return (

      <div className="ProductPage">
        <div>
         <div>
          <div>
            <div className="productHeader">
              <h3>Product List:</h3>
            </div>
              {productDiv}
            </div>
          </div>
        </div>

         <div className="productinput">
          <form className="addProduct" onSubmit={this.addProduct}>
            <label htmlFor="productname"></label>
            <div className="productName">
            <input ref="productname" name="productname"/>
            <input type="submit" hidden />
            <button className="btnAdd"onClick={this.addProduct}><span className="glyphicon glyphicon-plus"></span></button>
            </div>
            {/*<label htmlFor="price">Price:</label>
            <input ref="price" name="price"></input>
            <label htmlFor="description">Log:</label>
            <input ref="description" name="description"></input>*/}
          </form>
        </div>
        <Modal/>


      </div>
    )
  }
});

export default Product