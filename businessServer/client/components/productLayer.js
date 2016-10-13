import React from 'react';
import SingleForm from './SingleForm';
import InlineEdit from 'react-inline-edit';
import axios from 'axios';


const ProductLayer = React.createClass({
  addTopLayerNode: function(e){
    var currentConn;

    e.preventDefault();
    axios.post('/api/nodes', {
      question: "default question",
      productId: this.props.prodSelected,
      topLevel: true,
      layer: 2
    })
    .then(node => node.data)
    .then(node => {
    // console.log(this.props);
      this.props.addNewNode(node.productId, node.id, 2, true, node.productId);
      return node;
    })
    .then(node => {
      axios.put(`/api/connections/${this.props.prodSelected}`,{
        toId: node.id
      })
    })
    .catch(e => {
      if(e) throw e;
    })

  },

  loadData: function(e){
    // hard code in the business id
    // make ajax request for data

  },

  render: function(){

    var productName = this.props.connection[this.props.prodSelected].answer;
    // this.props.connection.forEach(conn => {
    //    if(conn.id == this.props.prodSelected){
    //     productName = conn.answer;
    //    }
    // })

     return (
       <div className="productLayer">
        <div className="bookmark-box product-title">
          <a className="boxclose" id="boxclose"></a>
          <div className="bookmark-title">
            <h3>The Chat Tree for {productName}</h3>
          </div>
        </div>

          <div className="gotolink"><h4><a onClick={this.addTopLayerNode}>Add Question >></a></h4></div>
          {/*<div className="addNodeButton">
            <button onClick={this.addTopLayerNode}>add question</button>
          </div>*/}

       </div>
     )
   }
 });
          {/*<div className="addNodeButton">  
            <button onClick={this.addTopLayerNode}>add question</button>
          </div>*/}

 export default ProductLayer
