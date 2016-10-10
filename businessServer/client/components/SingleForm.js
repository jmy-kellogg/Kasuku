import React from 'react';
import fetch from 'isomorphic-fetch';
import polyfill from 'es6-promise';
import InlineEdit from './InlineEdit';
import axios from 'axios';

const SingleForm = React.createClass({

	addNewAnswer: function(e){

		e.preventDefault();
		var ans = this.refs.answer.value;
		var fromId = this.props.i;


		// set the new connection id
		var newConnId = 0;
		if(this.props.connIds.length > 0){
			var newConnId = Math.max(...this.props.connIds) + 1;
		}

		// set business ID once business ids are set up.  but keep as null for now.
		var businessId = null;
		this.props.addAnswerAction(ans, fromId, businessId, newConnId);
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

		// define new id for node
		// var newId = 1;
		// if(this.props.nodeIds.length > 0){
		// 	newId = Math.max(...this.props.nodeIds) + 1;
		// }
		axios.post('/api/nodes/', {
			question: "default question",
			productId: this.props.selectedProd
		})

		// FILL IN THE .THEN

		var layer = this.props.layer+1;

		this.props.addNewNode(c.id, newId, layer, false);
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

		const answers = this.props.connection.filter(conn => {
			return conn.fromId === this.props.i;
		})
		const answersDiv = answers.map((ans, i) => {
			return (
				<option key={i} value={ans.id}>
					{ans.answer}
				</option>
			)
		})

		var _thisId = this.props.i;

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
