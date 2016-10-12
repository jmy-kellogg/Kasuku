import React from 'react';
import SingleForm from './SingleForm';
import InlineEdit from './InlineEdit';

const TopLayer = React.createClass({

  handleSelected: function(node, e){

    // console.log(node);
    this.props.changeSelected(node.id, node.layer);
    var thisLayer = 2;
    // top layer has to be 2.
    // all other layers start at 3
  },
render: function(){

  var nodesArr = [];
  for(var key in this.props.node){
    if(this.props.node[key].topLevel && +this.props.node[key].productId === this.props.prodSelected){
      nodesArr.push(this.props.node[key]);
    }
  }

  // const nodesArr = this.props.node.filter(node => {

  //    return node.topLevel && +node.productId === this.props.prodSelected;
  // })

   const nodesDiv = nodesArr.map((node, i) => {
      var q;
      if(node.question){
        q = node.question;
      }
      else{
        q = "I'm a question? Fill me out.";
      }
     return (
      <div id={`nodeContainer${i}`} onClick={this.handleSelected.bind(this, node)}>
        <SingleForm {...this.props} id={node.id} question={q} data={node} />
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

 export default TopLayer
