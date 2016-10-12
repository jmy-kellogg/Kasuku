import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Layers from './Layers';
import InlineEdit from './InlineEdit'

const Product = React.createClass({
  componentWillMount: function(){
    var _nodesIdArr = [];
    var _nodesArr = [];
    var allConnections;
    var _products = [];
    var sortNumbers = function(a,b){
      return a-b;
    }

    if(this.props.params.businessId){
      axios.get(`/api/connections/?businessId=${this.props.params.businessId}`)
      .then(res => res.data)
      .then(connections => {
        allConnections = connections;

        this.props.loadConnections(connections);

        connections.forEach(conn => {
          if(conn.fromId && !_nodesIdArr.includes(conn.fromId)){
            _nodesIdArr.push(conn.fromId);
          }
          if(conn.toId && !_nodesIdArr.includes(conn.toId)){
            _nodesIdArr.push(conn.toId);
          }
        })

      })
      .then(data => {
        console.log(_nodesIdArr.sort(sortNumbers));
        var headNodeId = Math.min(..._nodesIdArr);
        this.setState({
          headNode: headNodeId
        })

        allConnections.forEach(conn => {
          if(conn.fromId === headNodeId){
            _products.push(conn);
          }
        })
        this.props.loadProducts(_products);

        axios.get(`/api/nodes/`)
          .then(res => res.data)
          .then(nodes => {
            console.log(nodes);
            _nodesIdArr.forEach(nodeId => {
              _nodesArr.push(getNodeById(nodeId, nodes))
            })


            // this.props.setHeadNode(headNodeId);

            this.props.loadNodes(_nodesArr);
          })



        var getNodeById = function(id, nodes){
          var _node;
          nodes.forEach(node => {
            if(node.id == id){
              _node = node;
            }
          })
          return _node;
        }

      })
    }

  },


  getInitialState: function(){
    return {
      showLayers: false,
      headNode: "undefined",
      showGreetingNode: false
    }
  },
  selectProduct: function(product, e){
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
      console.log(node);
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
      this.props.addNewNode(null, node.id, 0, false, "head");
      // console.log(node);
      this.setState({
        showGreetingNode: true,
        headNode: node.id
      });
    })
    .catch(err => {
      if(err) throw err;
    })
  },

  addProduct: function(e){
    var name = this.refs.productname.value;
    var price = +this.refs.price.value;
    var description = this.refs.description.value;
    this.refs.productname.value = "";
    var businessId = null;
    axios.post('/api/connections/', {
      answer: name,
      fromId: this.state.headNode,
      productId: name,
      businessId,
      price,
      description

    })
    .then(conn => conn.data)
    .then(conn => {
      this.props.addProductAction(conn.id, name, this.state.headNode, businessId, price, description);
    })

    e.preventDefault();

  },
  render: function(){
    console.log(this.props);

    const defaultGreeting = "Welcome. What can I get for You?";
    const productDiv = this.props.product.map((product, i) => {
      return (
        <div id="ProductList">
          <div className="bookmark-box">
            <a className="boxclose" id="boxclose"></a>
            <div className="bookmark-title">
            <h3>Product List:</h3>
          </div>
          <div className="bodyText" key={i} onClick={this.selectProduct.bind(this, product)}>
          <h4 className="product-box">{product.name}</h4>
        </div>
        </div>
        </div>

      )
    })
    return (

      <div className="ProductPage">
        {!this.state.showGreetingNode ? <button className="btn-effect btn-lg" id="start" onClick={this.createHeadNode}> Let's make a ChatBot! Click to get Started</button> : null}

        {this.state.showGreetingNode ? 
      <div id="firstQuestion">
        <div className="bookmark-box">
          <a className="boxclose" id="boxclose"></a>
          <div className="bookmark-title">
            <h3>Write your first question below:</h3>
          </div>
          <div>
            <InlineEdit defaultValue={defaultGreeting} ref={"headNode"} onBlur={this.handleChange} />
          </div>
        </div>
            {/*<div class="gotolink"><h4><a href="#">Go to link >></a></h4></div>*/}   
      </div>: null}
        

        <div>
          {productDiv}
        </div>
        {this.state.showGreetingNode ? <div>
          <form className="addProduct" onSubmit={this.addProduct}>
            <label htmlFor="productname">Product Name:</label>
            <input ref="productname" name="productname"/>
            <label htmlFor="price">Price:</label>
            <input ref="price" name="price"></input>
            <label htmlFor="description">Log:</label>
            <input ref="description" name="description"></input>
            <input type="submit" hidden />
            <button className="btn-effect"onClick={this.addProduct}>add</button>
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
