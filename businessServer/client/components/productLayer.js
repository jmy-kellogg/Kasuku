import React from 'react';
import SingleForm from './SingleForm';
import InlineEdit from 'react-inline-edit';

const ProductLayer = React.createClass({
  addTopLayerNode: function(e){
    console.log(this.props.node);
    var id = this.props.node.length + 1

    this.props.addTopLayerNodeAction(id);

    e.preventDefault();

  },

  render: function(){
    var productName;
    this.props.product.forEach(product => {
      if(product.id == this.props.params.productId){
        productName = product.name;
      }
    })
    console.log(productName);

       return (
         <div>
          <div>
            The Chat Tree for {productName}
          </div>

          <button onClick={this.addTopLayerNode}>add</button>

         </div>

       )
   }
 });

 export default ProductLayer
