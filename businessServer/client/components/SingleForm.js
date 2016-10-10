import React from 'react';
import fetch from 'isomorphic-fetch';
import polyfill from 'es6-promise';
import InlineEdit from './InlineEdit';
import axios from 'axios';

const SingleForm = React.createClass({
	removeNode: function(e){
		console.log(this.props.data);
		console.log(this.props);
		// recursively delete down tree
		// axios.delete('/api/nodes/')


	},
	addNewAnswer: function(e){

		e.preventDefault();
		var answer = this.refs.answer.value;
		var fromId = this.props.id;

		axios.post('/api/connections', {
			answer: answer,
			fromId: fromId,
			productId: this.props.prodSelected
		})
		.then(conn => conn.data)
		.then(conn => {
			// set business ID once business ids are set up.  but keep as null for now.
			var businessId = null;
			this.props.addAnswerAction(conn.answer, conn.fromId, businessId, conn.id);
		})
		.catch(e => {
			if(e) throw e;
		})
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

		var layer = this.props.layer+1;

		axios.post('/api/nodes/', {
			question: "default question",
			productId: this.props.prodSelected,
			topLevel: false,
			layer: layer
		})
		.then(node => node.data)
		.then(node => {
			this.props.addNewNode(c.id, node.id, node.layer, false, node.productId);
		})

		// this.props.addNewNode(c.id, newId, layer, false);
	},
	handleChange: function(nodeId, e){
    var val = e.target.value;
    console.log(nodeId);
    axios.put(`/api/nodes/${nodeId}`, {
        question: val
    })
    .then(updatedNode => updatedNode.data)
    .then(updatedNode => {
    	this.props.saveNode(val, nodeId);
    })

  },

	render: function(){
		// console.log(this.props.connection)
		// console.log(this.props.i);
		console.log(this.props);

		const options = [{name:"YesNo", value:"YesNo"}, {name:"Multiple", value:"Multiple"}, {name:"Either", value:"Either"}, {name: "Quantity", value:"Quantity"}];
		const repeatOption = options.map((item, i) => {
			return (
				<option key={i}>{item.name}</option>
				)
		});

		const answers = this.props.connection.filter(conn => {
			return conn.fromId === this.props.id;
		})
		const answersDiv = answers.map((ans, i) => {
			return (
				<option key={i} value={ans.id}>
					{ans.answer}
				</option>
			)
		})

		var _thisId = this.props.id;

	    return (
	    	<div className="form">
	    	<button onClick={this.removeNode}>x</button>

	    		<div>
	    			<label htmlFor="type">Type: </label>
	    			<select name="type">
	    				{repeatOption}
	    			</select>
	    		</div>
	    		<div>
	    			<p>Question: </p>
          	<InlineEdit defaultValue={this.props.question} id={`question${_thisId}`} ref={`question${_thisId}`} onBlur={this.handleChange.bind(this, _thisId)}/>
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


	    	</div>
	    )
	}
});

export default SingleForm
