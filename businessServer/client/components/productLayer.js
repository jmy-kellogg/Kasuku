import React from 'react';
import SingleForm from './SingleForm';
import InlineEdit from 'react-inline-edit';

const ProductLayer = React.createClass({
  addTopLayerNode: function(productId=1, e){
    var newNodeId = 0;

    if(this.props.nodeIds.length > 0){
      newNodeId = Math.max(...this.props.nodeIds) + 1;
    }

    this.props.addTopLayerNodeAction(newNodeId, productId, 2);

    e.preventDefault();
  },
  saveEverything: function(e){
    // send all data in a post request
    // split the nodes and send
    console.log(this.props.node);
    console.log(this.props.connection);
    if(this.props.node){
      this.props.node.forEach(n => {
        this.props.saveNodeAction(n);
      })
    }
    if(this.props.connection){
      this.props.connection.forEach(conn => {
        this.props.saveConnAction(conn);
      })
    }
    // this.props.saveDataAction(this.props.node, this.props.conn);
    e.preventDefault();


  },

  render: function(){
    var productName, productId;
    this.props.product.forEach(product => {
      if(product.id == this.props.params.productId){
        productName = product.name;
        productId = product.id;
      }
    })
     return (
       <div>
        <div>
          The Chat Tree for {productName}
        </div>
        <button onClick={this.addTopLayerNode.bind(this, productId)}>add</button>
        <button onClick={this.saveEverything}>save</button>

       </div>

     )
   }
 });

 export default ProductLayer
