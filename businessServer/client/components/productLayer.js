import React from 'react';
import SingleForm from './SingleForm';
import InlineEdit from 'react-inline-edit';
import axios from 'axios';


const ProductLayer = React.createClass({
  addTopLayerNode: function(productId, e){

    e.preventDefault();
    axios.post('/api/nodes', {
      question: "default question",
      productId: this.props.prodSelected,
      topLevel: true,
      layer: 2
    })
    .then(node => {
      this.props.addTopLayerNodeAction(node.id, node.productId, 2, true);
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
    var productId = this.props.prodSelected;

     return (
       <div>
        <div>
          The Chat Tree for {productId}
        </div>
        <button onClick={this.addTopLayerNode.bind(this, productId)}>add</button>
       </div>

     )
   }
 });

 export default ProductLayer
