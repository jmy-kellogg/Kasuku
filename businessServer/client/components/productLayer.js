import React from 'react';
import SingleForm from './SingleForm';
import InlineEdit from 'react-inline-edit';
import axios from 'axios';


const ProductLayer = React.createClass({
  addTopLayerNode: function(e){
    var currentConn;
    console.log(this.props);

    e.preventDefault();
    axios.post('/api/nodes', {
      question: "default question",
      productId: this.props.prodSelected,
      topLevel: true,
      layer: 2
    })
    .then(node => node.data)
    .then(node => {
      this.props.addTopLayerNodeAction(node.id, node.productId, 2, true);
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

    var productName
    this.props.connection.forEach(conn => {
       if(conn.id == this.props.prodSelected){
        productName = conn.answer;
       }
    })

     return (
       <div>
        <div>
          <h1>The Chat Tree for {productName}</h1>
        </div>
          <div className="addNodeButton">
            <button onClick={this.addTopLayerNode}>add question</button>
          </div>
       </div>

     )
   }
 });

 export default ProductLayer
