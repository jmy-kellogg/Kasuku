import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import InlineEdit from './InlineEdit';
import classNames from 'classnames';

const Product = React.createClass({


  getInitialState: function(){
    return {
      ...this.state,
      showLayers: false,
      showGreetingNode: false,
      currentProduct: null
    }
  },
  selectProduct: function(product, e){
    this.state.currentProduct = product.id
    this.props.setSelectedProduct(product.id);
    this.setState({showLayers: true});
    e.preventDefault();
  },


  addProduct: function(e){
    var answer = this.refs.productname.value;
    // var price = +this.refs.price.value;
    // var description = this.refs.description.value;
// <<<<<<< HEAD
// =======
//     var price = null;
//     var description = null;
// >>>>>>> master

    this.refs.productname.value = "";
    var businessId = this.props.params.businessId;
    console.log(businessId);
    axios.post('/api/connections/', {
      answer: answer,
      fromId: null,
      // if fromId is null, must be product
      productId: null,
      businessId,
      // price,
      // description
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
          this.props.addProductAction(conn.id, answer, null, businessId, null, null, conn.id);
        })
    })
    .catch(err => {
      if(err) throw err;
    })

    e.preventDefault();

  },
  render: function(){


    const productDiv = this.props.product.map((product, i) => {
      console.log(product.id)
      let divClassName = classNames({
        "product-box": true,
        "hightlight": this.state.currentProduct === product.id
      });
      return (
        <div className={divClassName} key={i} onClick={this.selectProduct.bind(this, product)}>
           <h3>{product.name}</h3>
        </div>


      )
    })
    return (
      <div className="ProductPage">
        <div>
         <div>
          <div>
            <div>
              <h2>Product List</h2>
            </div>
              {productDiv}
            </div>
          </div>
        </div>

         <div className="productinput">
          <form className="addProduct" onSubmit={this.addProduct}>
            <label htmlFor="productname"></label>
            <div className="productName">
            <input type="submit" hidden />
            <button className="btnAdd"onClick={this.addProduct}>Add</button>
            <input ref="productname" name="productname"/>
            </div>
            {/*<label htmlFor="price">Price:</label>
            <input ref="price" name="price"></input>
            <label htmlFor="description">Log:</label>
            <input ref="description" name="description"></input>*/}
          </form>
        </div>

      </div>
    )
  }
});

export default Product
