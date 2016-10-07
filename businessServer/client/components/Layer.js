import React from 'react';
import SingleForm from './SingleForm';


const Layer = React.createClass({

  render: function(){
  

    const parentId = 1;

    const connectionsArr = this.props.connection.filter(conn => {
      return conn.fromId === parentId;
    }).map(conn => {
      return conn.toId
    })

    const nodesArr = this.props.node.filter(node => {
      return connectionsArr.includes(node.id);
    })

    // use actions to make ajax request to route /products/:id for parent node and its array of connected nodes.

    const nodesDiv = nodesArr.map((node, i) => {
      return (
        <SingleForm {...this.props} key={i} i={node.id} node={node}/>
      )
    })

      return (
        <div className="layerBox">
          {nodesDiv}
        </div>
      )
  }
});


export default Layer
