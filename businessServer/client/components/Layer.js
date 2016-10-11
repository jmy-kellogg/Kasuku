import React from 'react';
import SingleForm from './SingleForm';

const Layer = React.createClass({
  handleSelected: function(node, e){

    this.props.changeSelected(node.id, node.layer);
    // top layer has to be 2.
  },

  render: function(){
    // this.props.data is the array of all the node ids that should populate this layer

    // parentId must be the node selected from the row above.
    // row 1  : undefined : undefined : product layer
    // row 2  : undefined : selected[0] : top layer
    // row 3+ : layers[0] : selected[1] : all other layers
    var parentId;
    if(this.props.selected){
      parentId = this.props.selected[this.props.layer-3];
    }
    else{
      parentId = null;
    }

    const connectionsArr = this.props.connection.filter(conn => {
      return conn.fromId === parentId;
    }).map(conn => {
      return conn.toId
    })

    const nodesArr = this.props.node.filter(node => {
      return connectionsArr.includes(node.id) && +node.productId === this.props.prodSelected;
    })

    var nodesDiv = nodesArr.map((node, i) => {
      var q;
      if(node.question){
        q = node.question;
      }
      else{
        q = "I'm a question? Fill me out.";
      }
      return (
        <div ref={`nodeContainer${i}`} onClick={this.handleSelected.bind(this, node)}>
          <SingleForm {...this.props} id={node.id} question={q} layer={this.props.layer} data={node}/>
        </div>
      )
    })
    var allConnId = this.props.connection.map(conn => {
      return conn.id;
    })

    return (
      <div>
        {nodesDiv}
      </div>
    )
  }
});


export default Layer
