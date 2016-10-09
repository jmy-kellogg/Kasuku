import React from 'react';
import SingleForm from './SingleForm';
import InlineEdit from 'react-inline-edit';

const ProductLayer = React.createClass({
  addTopLayerNode: function(productId, e){
    var nodeId = 0;
    this.props.node.forEach(n => {
      if(node.id > nodeId){
        nodeId = node.id;
      }
    })
    // var nodeId = this.props.node.length + 1
    console.log(productId);

    this.props.addTopLayerNodeAction(nodeId, productId, 2);
    // this.props.addNewNode(c.id, newId, layer);

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

         </div>

       )
   }
 });

 export default ProductLayer
