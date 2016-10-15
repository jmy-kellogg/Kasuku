import React from 'react';
import SingleForm from './SingleForm';
import axios from 'axios';

const Layer = React.createClass({
  handleSelected: function(node, e){

    this.props.changeSelected(node.id, node.layer);
  },
  addNodeSameLayer: function(e){
    var currentConnection = this.props.selected[this.props.layer-2];
    // console.log(this.props.selected);
    // console.log(currentConnection);

    e.preventDefault();
    axios.post('/api/nodes', {
      question: "default question",
      productId: this.props.prodSelected,
      topLevel: false,
      layer: this.props.layer
    })
    .then(node => node.data)
    .then(node => {

      this.props.addNewNode(currentConnection.id, node.id, this.props.layer, false, node.productId);
      return node;
    })
    .then(node => {
      axios.post(`/api/connections`, {
        answer: currentConnection.answer,
        fromId: currentConnection.fromId,
        businessId: this.props.params.businessId,
        price: null,
        description: null,
        toId: node.id
      })
      // axios.put(`/api/connections/${currentConnection.id}`,{
      //   toId: node.id
      // })
    })
    .catch(e => {
      if(e) throw e;
    })

  },

  render: function(){
    // this.props.data is the array of all the node ids that should populate this layer
    // parentId must be the node selected from the row above.
    // var parentId;
    // if(this.props.selected){
    //   parentId = this.props.selected[this.props.layer-2];
    // }
    // else{
    //   parentId = null;
    // }

    // console.log(this.props.layer);
    // console.log(this.props.selected);
    // var connectionsArr = [];
    // for(var key in this.props.connection){
    //   if(this.props.connection[key].fromId === 1){
    //     connectionsArr.push(this.props.connection[key].toId);
    //   }
    // }
    var nodesArr = [];
    for(var key in this.props.node){
      // if(connectionsArr.includes(this.props.node[key].id) && +this.props.node[key].productId === this.props.prodSelected){
      if(this.props.selected[this.props.layer-2]){
        if(this.props.node[key].id === this.props.selected[this.props.layer-2].toId){
          nodesArr.push(this.props.node[key]);
        }
      }
    }

    var nodesDiv = nodesArr.map((node, i) => {
      var q;
      if(node.question){
        q = node.question;
      }
      else{
        q = "I'm a question? Fill me out.";
      }
      return (
        <div className="mooo" key={i} ref={`nodeContainer${i}`} >
          <div className='metal addtoplayernode' onClick={this.addNodeSameLayer}></div>
          <SingleForm {...this.props} id={node.id} question={q} layer={this.props.layer} data={node}/>
        </div>
      )
    })

    return (
        <div>
          {nodesDiv}
        </div>
    )
  }
});


export default Layer
