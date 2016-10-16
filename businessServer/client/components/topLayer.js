import React from 'react';
import SingleForm from './SingleForm';
import InlineEdit from './InlineEdit';
import axios from 'axios';

const TopLayer = React.createClass({
  addTopLayerNode: function(e){
      // console.log(this.props.topLevelNodes[this.props.prodSelected])
      // this.props.topLevelNodes[this.props.prodSelected] this is an array of the top level nodes for the selected product
    var currentConn;
// <<<<<<< HEAD
// =======
    // I'M NOT SURE WHETHER TO TO DELETE OR UPDATE THIS BASED 
    console.log(this.props.prodSelected);
    console.log(this.props.topLevelNodes);
    var newTopLevelIndex = 0;
    if(this.props.topLevelNodes[this.props.prodSelected]){
      newTopLevelIndex = this.props.topLevelNodes[this.props.prodSelected].length;
    }
    // var newTopLevelIndex = this.props.topLevelNodes[this.props.prodSelected].length;

// >>>>>>> master
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
      console.log(newTopLevelIndex)

      this.props.addNewNode(node.productId, node.id, 1, true, node.productId, newTopLevelIndex, true);
      return node;
    })
    .then(node => {
      // axios.put(`/api/connections/${this.props.prodSelected}`,{
      //   toId: node.id
      // })
    })
    .catch(e => {
      if(e) throw e;
    })
  },
  scrollTo: function(i, e){
        e.preventDefault();
        var place = "#nodeContainer" + i
        console.log("scrooled", place)
        $('html,body').animate({
        scrollTop: $(place).offset().top-74},
        'slow');
  },
  handleSelected: function(node, e){
    this.props.changeSelected(node.id, node.layer);
  },
// <<<<<<< HEAD
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
      }
     return (
      <div key={i} id={`nodeContainer${i}`} onClick={this.scrollTo.bind(this, i)}>
{/*=======
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
    }
   return (
      <div key={i} id={`nodeContainer${i}`} >
>>>>>>> master*/}
        <SingleForm {...this.props} id={node.id} question={q} data={node} layer={this.props.layer} />
      </div>
    )
  })
  console.log(nodesDiv);
  return (
   <div className='toplayer-container'>
{/*<<<<<<< HEAD
    {nodesDiv}
    <div className='addtoplayernode' onClick={this.addTopLayerNode}><span className="glyphicon glyphicon-plus"></span></div>

{/*=======*/}
    {this.props.prodSelected !== undefined ? <div className='metal addtoplayernode' onClick={this.addTopLayerNode}> Add New Question</div> : null}
      {nodesDiv}
{/*>>>>>>> master*/}
   </div>
)
   }
 });

 export default TopLayer
