import React from 'react';
import SingleForm from './SingleForm';


const Layer = React.createClass({
  handleSelected: function(node, e){
    this.props.changeSelected(node.id, node.layer);
  },

  render: function(){
    // this.props.data is the array of all the node ids that should populate this layer

    // parentId must be the node selected from the row above.
    // header  : undefined : undefined : product layer
    // layer 0 : layers[0] : selected[0] : all layers
    var parentId;
    if(this.props.selected){
      parentId = this.props.selected[this.props.layer-2];
    }
    else{
      parentId = null;
    }


    var connectionsArr = [];
    for(var key in this.props.connection){
      if(this.props.connection[key].fromId === parentId){
        connectionsArr.push(this.props.connection[key].toId);
      }
    }

    var nodesArr = [];
    for(var key in this.props.node){
      if(connectionsArr.includes(this.props.node[key].id) && +this.props.node[key].productId === this.props.prodSelected){
        nodesArr.push(this.props.node[key]);
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
        <div key={i} ref={`nodeContainer${i}`} onClick={this.handleSelected.bind(this, node)}>
          <SingleForm {...this.props} id={node.id} question={q} layer={this.props.layer} data={node}/>
        </div>
      )
    })

    return (
        {nodesDiv}
    )
  }
});


export default Layer
