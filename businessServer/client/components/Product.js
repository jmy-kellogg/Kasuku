import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Layers from './Layers';
import InlineEdit from './InlineEdit'

const Product = React.createClass({

  getInitialState: function(){
    return {
      showLayers: false,
      headNode: "undefined",
      showGreetingNode: false,
    }
  },
  onClick: function(product, e){
    this.setState({showLayers: true})
    this.props.setSelectedProduct(product.id);
  },
  handleChange: function(e){
    var greeting = e.target.value;
    console.log(this.state.headNode);
    axios.put(`/api/nodes/${this.state.headNode}`, {
      question: greeting,
      productId: "head",
      topLevel: false,
      layer: 0
    })
    .then(node => node.data)
    .then(node => {
      this.props.saveNode(greeting, node.id);
    })
  },
  createHeadNode: function(e){

    axios.post('/api/nodes/', {
      question: "undefined",
      productId: "head",
      topLevel: false,
      layer: 0
    })
    .then(node => node.data)
    .then(node => {
      console.log(node);
      this.setState({
        showGreetingNode: true,
        headNode: node.id
      });
      // this.props.setHeadNode(node.id);
    })
    .catch(err => {
      if(err) throw err;
    })
  },


  addProduct: function(e){
    var name = this.refs.productname.value;
    var businessId = null;
    axios.post('/api/connections/', {
      answer: name,
      fromId: this.state.headNode,
      productId: name,
      businessId: businessId
    })
    .then(conn => conn.data)
    .then(conn => {
      this.props.addProductAction(conn.id, name, this.state.headNode, businessId);

    })

    e.preventDefault();

    // var productId = 1;
    // this.props.product.forEach(prod => {
    //   if(prod.id > productId){
    //     productId = prod.id + 1;
    //   }
    // })


  },
  render: function(){

    const defaultGreeting = "Welcome. What can I get for You?";
    const productDiv = this.props.product.map((product, i) => {
      return (
        <div className="product-box" key={i} onClick={this.onClick.bind(this, product)}>
          {product.name}
        </div>
      )
    })
    return (
      <div className="Product">
        <button onClick={this.createHeadNode}>Click to get Started</button>
        {this.state.showGreetingNode ? <div>
          <div>Write your first question below:</div>
          <InlineEdit id="firstQuestion" defaultValue={defaultGreeting} ref={"headNode"} onBlur={this.handleChange} />
        </div> : null}
        <div>
          <div>
            <p>Add an answer to first Question to start tree or Click on answer</p>
          </div>
          {productDiv}
        </div>
        <div>
          <input ref="productname" name="productname"/>
          <button onClick={this.addProduct}>add</button>

        </div>
        <div>
        {this.state.showLayers ? <Layers {...this.props}/> : null }
        </div>

      </div>
    )
  }
});

export default Product

// <Link to={`/layers/${product.id}`}>
