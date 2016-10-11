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
      showGreetingNode: false
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
    this.refs.productname.value = "";
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

  },
  render: function(){

    const defaultGreeting = "Welcome. This is the default greeting";
    const productDiv = this.props.product.map((product, i) => {
      return (
        <div className="product-box" key={i} onClick={this.onClick.bind(this, product)}>
          {product.name}
        </div>
      )
    })
    return (
      <div>
        {!this.state.showGreetingNode ? <div onClick={this.createHeadNode}>Get Started</div> : null}
        {this.state.showGreetingNode ? <div>
          <InlineEdit defaultValue={defaultGreeting} ref={"headNode"} onBlur={this.handleChange} />
        </div> : null}
        <div>
          {productDiv}
        </div>
        {this.state.showGreetingNode ? <div>
          <form onSubmit={this.addProduct}>
            <input ref="productname" name="productname"/>
            <input type="submit" hidden />
            <button onClick={this.addProduct}>add</button>
          </form>
        </div> : null}
        <div>
        {this.state.showLayers ? <Layers {...this.props}/> : null }
        </div>

      </div>
    )
  }
});

export default Product
