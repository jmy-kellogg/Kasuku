import React from 'react';
import SingleForm from './SingleForm';
import InlineEdit from './InlineEdit';
import axios from 'axios';
import classNames from 'classnames';

const TopLayer = React.createClass({

  scrollTo: function(node, e){
        e.preventDefault();
        var place = "#nodeContainer" + node.id
        $('.toplayer-container').animate({
        scrollTop: $('.toplayer-container').scrollTop() + $(place).offset().top - 74},
        'slow');
        this.state.currentQuestion = node.id;
      },
  getInitialState: function() {
    return {
        ...this.state,
        currentQuestion: null,
      };
  },
  addTopLayerNode: function(e){
      // this.props.topLevelNodes[this.props.prodSelected] this is an array of the top level nodes for the selected product
    var currentConn;

    var newTopLevelIndex = 0;
    if(this.props.topLevelNodes[this.props.prodSelected]){
      newTopLevelIndex = this.props.topLevelNodes[this.props.prodSelected].length;
    }

    console.log(newTopLevelIndex);

    e.preventDefault();
    axios.post('/api/nodes', {
      question: "default question",
      productId: this.props.prodSelected,
      topLevel: true,
      layer: 1,
      topLevelNodeIndex: newTopLevelIndex,
      leafNode: true

    })
    .then(node => node.data)
    .then(node => {


      this.props.addNewNode(node.productId, node.id, 1, true, node.productId, newTopLevelIndex, true);
      return node;
    })
    .then(node => {
      // console.log(node);
      this.props.updateProductTo(node.productId, node.id);
      var _connsToChange = [];

      if(newTopLevelIndex > 0){
        const previousTopLevelNodeId = this.props.topLevelNodes[this.props.prodSelected][newTopLevelIndex-1].id;
        for(var key in this.props.node){
          if(this.props.node[key].productId === this.props.prodSelected){
            this.props.node[key].conns.forEach(conn => {
              if(this.props.connection[conn].toId === null){
                _connsToChange.push(this.props.connection[conn]);
              }
            })
          }
        }
        this.props.updateLeafNodeConnections(_connsToChange, previousTopLevelNodeId);
      }


      // var changeAllLeafNodes = function(nodeId){
      //   this.props.node[nodeId].conns.forEach(conn => {
      //     if(conn.toId === null){
      //       _connsToChange.push(conn);
      //     }
      //     else{
      //       if(!this.props.node[nodeId].leafNode){
      //         changeAllLeafNodes(conn.toId);
      //       }
      //     }
      //   })
      // }
      // changeAllLeafNodes(previousTopLevelNodeId);
      //change all leaf nodes from previous top layer node

      axios.put(`/api/connections/leaf`, {
        conns: _connsToChange,
        toId: node.id
      })
      .then(res => {
        console.log(res.data);
      })

      console.log(node.productId);
      console.log(newTopLevelIndex);
      //change product toId
      if(newTopLevelIndex === 0){
        console.log('inside here');
        axios.put(`/api/connections/${node.productId}`, {
          toId: node.id
        })
        .then(res => {
          // console.log(res.data);
        })
      }

      // this.props.connection[node.productId]
      // update product to point to node.
      // update all leaf node connections to point to new toplayer
      // axios.put(`/api/connections/${this.props.prodSelected}`,{
      //   toId: node.id
      // })
    })
    .catch(e => {
      if(e) throw e;
    })
  },


  handleSelected: function(node, e){
    this.props.changeSelected(node.id, node.layer);
  },
render: function(){

  var nodesArr = [];
  for(var key in this.props.node){
    if(this.props.node[key].topLevel && this.props.node[key].productId == this.props.prodSelected){
      nodesArr.push(this.props.node[key]);
    }
  }
  const nodesDiv = nodesArr.map((node, i) => {
    var q;
    if(node.question){
      q = node.question;
    }
    else{
      q = "I'm a question? Fill me out.";
    };
      // added this //
      let divClassName = classNames({
        "question": true,
        active: this.state.currentQuestion === node.id
        })

   return (
      <div className={divClassName}key={i} id={`nodeContainer${node.id}`}  onClick={this.scrollTo.bind(this, node)}>
        <SingleForm {...this.props} id={node.id} question={q} data={node} layer={this.props.layer} />
      </div>
    )
  })
  return (

   <div className='toplayer-container' id='toplayer-container'>
    {nodesDiv}
    {this.props.prodSelected >= 0 ? <div className='addtoplayernode' onClick={this.addTopLayerNode}> <span className="glyphicon glyphicon-plus"></span></div> : null}
   </div>
)
   }
 });

 export default TopLayer
