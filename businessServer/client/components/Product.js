import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import InlineEdit from './InlineEdit'

const Product = React.createClass({

  getInitialState: function(){
    return {
      showLayers: false
    }
  },
  selectProduct: function(product, e){
    this.setState({showLayers: true})
    this.props.setSelectedProduct(product.id);
  },


  addProduct: function(e){
    var answer = this.refs.productname.value;
    var price = +this.refs.price.value;
    var description = this.refs.description.value;

    this.refs.productname.value = "";
    var businessId = 1;
    axios.post('/api/connections/', {
      answer: name,
      fromId: null,
      // if fromId is null, must be product
      productId: null,
      businessId,
      price,
      description
    })
    .then(conn => conn.data)
    .then(conn => {
      console.log(conn);
      axios.put(`/api/connections/${conn.id}`, {
        productId: conn.id
      })
        .then(res => res.data)
        .then(updatedConn => {
          // addProductAction(id, answer, fromId, businessId=null, price=null, description=null)
          this.props.addProductAction(conn.id, answer, null, businessId, price, description, productId);
        })
    })

    e.preventDefault();

  },
  render: function(){


    const productDiv = this.props.product.map((product, i) => {
      return (

        <div className="bodyText" key={i} onClick={this.selectProduct.bind(this, product)}>
            <h4 className="product-box">{product.name}</h4>
        </div>


      )
    })
    return (

      <div className="ProductPage">

        <div>
         <div>
          <div>
            <div>
              <h3>Product List:</h3>
            </div>
              {productDiv}
            </div>
          </div>
        </div>

         <div className="productinput">
          <form className="addProduct" onSubmit={this.addProduct}>
            <label htmlFor="productname">Product Name:</label>
            <input ref="productname" name="productname"/>
            <label htmlFor="price">Price:</label>
            <input ref="price" name="price"></input>
            <label htmlFor="description">Log:</label>
            <input ref="description" name="description"></input>
            <input type="submit" hidden />
            <button className="btnAdd"onClick={this.addProduct}>add</button>
          </form>
        </div>

      </div>
    )
  }
});

export default Product
