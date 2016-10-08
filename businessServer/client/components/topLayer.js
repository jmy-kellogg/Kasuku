import React from 'react';
import SingleForm from './SingleForm';
import InlineEdit from './InlineEdit';

var ContentEditable = require("react-contenteditable");


const TopLayer = React.createClass({
  setChange: function(){
    this.props.setChangeAction();

  },
  displayStuff: function(){
    console.dir(this.refs);
    // console.log(this.refs[1].value());

  },
  handleSelected: function(e){
    console.log(e.target);

    //fire action to set state to the selected val

  },
  getInitialState: function(){
      var _stateArr = this.props.node.filter(node => {
        return node.topLevel;
      })
      console.log(_stateArr);
      return {childData: _stateArr};
    },

    handleChange: function(e){
      var val = e.target.value;
      var thisId = e.target.id.match(/\d/g);
      this.props.saveNode(val, thisId);
      // (e.target);

      // this.setState({html: e.target.value});
    },

  render: function(){


    console.log(this.props.i);

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
          q = "Fill me out";
        }

       return (
        <div>
          <SingleForm {...this.props} id={`node${node.id}`} question={q} level={this.props.i} onClick={this.handleSelected}/>

        </div>
      )
    })


     return (
       <div>
         {nodesDiv}
         <SingleForm {...this.props} i={newId} />
         <button onClick={this.displayStuff}>stuff</button>
       </div>
     )
   }
 });

 export default TopLayer
/*
<div>
            <p>Question: </p>
            <InlineEdit defaultValue={q} id={`question${node.id}`} ref={`question${node.id}`} onBlur={this.handleChange}/>
          </div>
          <div>
            <p>Answers</p>

          </div>
          */
