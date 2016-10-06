import React from 'react';
import SingleForm from './SingleForm';

const TopLayer = React.createClass({

  render: function(){
    // console.log(this.props.node);

    // const parentId = 1;

    // const connectionsArr = this.props.connection.filter(conn => {
    //   return conn.fromId === parentId;
    // }).map(conn => {
    //   return conn.toId
    // })
    // console.log('props nodes',this.props.node);
    // console.log('connections array', connectionsArr);

    // const nodesArr = this.props.node.filter(node => {
    //   return connectionsArr.includes(node.id);
    // })

    // call function to call action to make ajax request for all top layer nodes
    // but for the time being...
    const nodesArr = this.props.node.filter(node => {
      return node.topLevel;
    })


    const nodesDiv = nodesArr.map((node, i) => {
      return (
        <p>Question: {node.question}</p>
      )
    })
      return (
        <div>
          {nodesDiv}
          <SingleForm {...this.props} />
        </div>
      )
  }
});

export default TopLayer
