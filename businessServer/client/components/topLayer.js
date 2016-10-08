import React from 'react';
import SingleForm from './SingleForm';
import InlineEdit from './InlineEdit';


const TopLayer = React.createClass({

  handleSelected: function(e){
    console.dir(e.target);
    // var thisId = e.target.id.match(/\d/g).join('');
    var thisLayer = 2;
    // this.props.changeSelected(thisId, thisLayer);

    //fire action to set state to the selected val

  },
    handleChange: function(e){
      var val = e.target.value;
      var thisId = e.target.id.match(/\d/g).join('');
      this.props.saveNode(val, thisId);

    },

  render: function(){

    const nodesArr = this.props.node.filter(node => {
       return node.topLevel;
    })
    const newId = this.props.node.length + 1;

     const nodesDiv = nodesArr.map((node, i) => {
        var q;
        if(node.question){
          q = node.question;
        }
        else{
          q = "I'm a question. Fill me out?";
        }
       return (
        <div onClick={this.handleSelected}>
          <SingleForm {...this.props} id={`node${node.id}`} question={q} layer={this.props.i}/>
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
