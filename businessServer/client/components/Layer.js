import React from 'react';
import SingleForm from './SingleForm';


const Layer = React.createClass({
  handleSelected: function(node, e){

    console.log(node);
    this.props.changeSelected(node.id, node.layer);
    var thisLayer = this.props.i;
    // top layer has to be 2.
  },

  render: function(){
    // console.log(this.props.data);
    console.log(this.props.selected);
    console.log(this.props.layers);

    console.log(this.props.selected[this.props.i-3]);
    const parentId = this.props.selected[this.props.i-3];

    const connectionsArr = this.props.connection.filter(conn => {
      return conn.fromId === parentId;
    }).map(conn => {
      return conn.toId
    })

    const nodesArr = this.props.node.filter(node => {
      return connectionsArr.includes(node.id);
    })

    // use actions to make ajax request to route /products/:id for parent node and its array of connected nodes.

    var nodesDiv = nodesArr.map((node, i) => {
      var q;
      if(node.question){
        q = node.question;
      }
      else{
        q = "I'm a question? Fill me out.";
      }
      return (
        <SingleForm {...this.props} key={i} id={`node${node.id}`} question={q} layer={this.props.i} node={node}/>
      )
    })
    var allConnId = this.props.connection.map(conn => {
      return conn.id;
    })

    var uniqueId = Math.max(...allConnId) + 1;

    return (
      <div>
        {nodesDiv}

      </div>
    )
      return (
        <div className="layerBox">

          {nodesDiv}
        </div>
      )
  }
});


export default Layer
