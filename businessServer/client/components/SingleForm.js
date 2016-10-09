import React from 'react';
import fetch from 'isomorphic-fetch';
import polyfill from 'es6-promise';
import InlineEdit from './InlineEdit';

const SingleForm = React.createClass({

	addNewAnswer: function(e){

		e.preventDefault();
		var ans = this.refs.answer.value;
		// var fromId = this.props.node.length+1;
		var fromId = this.props.i;
		var id = this.props.connection.length + 1;
		this.props.addAnswerAction(ans, fromId, null, id);
	},
	addNewNode: function(e){
		e.preventDefault();
		var c;
		var connId = this.refs.answerSelect.value;
		this.props.connection.forEach(conn => {
			if(conn.id == connId){
				c = conn;
			}
		})
		var newId = this.props.node.length + 1;
		var layer = this.props.layer+1;
		console.log(layer);

		this.props.addNewNode(c.id, newId, layer);

	},
	saveNode: function(e){
		var q = this.refs.question.value;
		var thisId = this.props.i;
		this.props.saveNode(q, thisId);
		e.preventDefault();
	},
	handleChange: function(e){
    var val = e.target.value;
    if(e.target.id){
      var thisId = e.target.id.match(/\d/g).join('');
    }
    this.props.saveNode(val, thisId);
  },

	render: function(){
		const options = [{name:"YesNo", value:"YesNo"}, {name:"Multiple", value:"Multiple"}, {name:"Either", value:"Either"}, {name: "Quantity", value:"Quantity"}];
		const repeatOption = options.map((item, i) => {
			return (
				<option key={i}>{item.name}</option>
				)
		});
		// console.log(this);
		const answers = this.props.connection.filter(conn => {
			return conn.fromId === this.props.i;
		})
		const answersDiv = answers.map((ans, i) => {
			return (
				<option value={ans.id}>
					{ans.answer}
				</option>
			)
		})

		var _thisId = this.props.i;
		// if(this.props.id){
		// 	// console.log(this.props.id);
		// 	_thisId = this.props.id.match(/\d/g).join('');
		// }

	    return (
	    	<div className="form">
	    		<form>
	    		<div>
	    			<label htmlFor="type">Type: </label>
	    			<select name="type">
	    				{repeatOption}
	    			</select>
	    		</div>
	    		<div>
	    			<p>Question: </p>
          	<InlineEdit defaultValue={this.props.question} id={`question${_thisId}`} ref={`question${_thisId}`} onBlur={this.handleChange}/>
	    		</div>
	    		<div>
	    			{/*repeatAnswer*/}
	    		</div>
	    		<div>
	    			<select ref="answerSelect">
	    				{answersDiv}
	    			</select>
	    			<button onClick={this.addNewNode}>add node</button>
	    			<label htmlFor="answer">Answer: </label>
	    			<input ref="answer" name="answer"></input>
	    			<button onClick={this.addNewAnswer}>add answer</button>
	    		</div>
	    		</form>

	    	</div>
	    )
	}
});

export default SingleForm
