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
