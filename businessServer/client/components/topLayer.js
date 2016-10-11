import React from 'react';
import SingleForm from './SingleForm';
import InlineEdit from './InlineEdit';
import { Carousel } from 'react-bootstrap';

const TopLayer = React.createClass({

  handleSelected: function(node, e){

    // console.log(node);
    this.props.changeSelected(node.id, node.layer);
    var thisLayer = 2;
    // top layer has to be 2.
    // all other layers start at 3
  },
render: function(){

  const nodesArr = this.props.node.filter(node => {
     return node.topLevel;
  })

   const nodesDiv = nodesArr.map((node, i) => {
      var q;
      if(node.question){
        q = node.question;
      }
      else{
        q = "I'm a question? Fill me out.";
      }
     return (
        <Carousel.Item>
      <div id={`nodeContainer${i}`} onClick={this.handleSelected.bind(this, node)}>
        <SingleForm {...this.props} id={node.id} question={q} data={node} />
      </div>    
       </Carousel.Item>

    )
  })
  return (
   <div>
     <Carousel className="layer" interval={false}>
      {nodesDiv}
      </Carousel>
   </div>
)
   }
 });

 export default TopLayer
