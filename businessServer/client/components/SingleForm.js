import React from 'react';
import fetch from 'isomorphic-fetch';
import polyfill from 'es6-promise';
import InlineEdit from './InlineEdit';
import axios from 'axios';

const SingleForm = React.createClass({
	removeNode: function(e){
		console.log(this.props.data);
		console.log(this.props.node);
		// id of this node is this.props.id
		// get all connections that are associated with this node
		// get all nodes that are connected to those connections
		// repeat
		var nodesForRemoval = [];
		var connsForRemoval = [];
		// var queue = [];

		var getAllForRemoval = function(nodeId){


			nodesForRemoval.push(id);
			this.props.connection.forEach(conn => {
				if(conn.fromId === id){
					connsForRemoval.push(conn.id);
					nodesForRemoval.push(conn.toId);
				}
			})
		}
		// recursively delete down tree
		// axios.delete('/api/nodes/')
	},
	addNewAnswer: function(e){

		e.preventDefault();
		var answer = this.refs.answer.value;
		this.refs.answer.value = "";
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
		var connId = this.refs.answerSelect.value;

		var currentConn = this.props.connection[connId];

		// this.props.connection.forEach(conn => {
		// 	if(conn.id == connId){
		// 		currentConn = conn;
		// 	}
		// })

		var layer = this.props.layer+1;

		axios.post('/api/nodes/', {
			question: "default question",
			productId: this.props.prodSelected,
			topLevel: false,
			layer: layer
		})
		.then(node => node.data)
		.then(node => {
			this.props.addNewNode(currentConn.id, node.id, node.layer, false, node.productId);
			return node;
		})
		.then(node => {
			console.log(node);
			axios.put(`/api/connections/${currentConn.id}`, {
				toId: node.id
			})
			.then(conn => {
				console.log(conn);
			})
		})

	},
	handleChange: function(nodeId, e){
    var val = e.target.value;
    // console.log(nodeId);
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
		console.log(this.props.connection);

		const options = [{name:"YesNo", value:"YesNo"}, {name:"Multiple", value:"Multiple"}, {name:"Either", value:"Either"}, {name: "Quantity", value:"Quantity"}];
		const repeatOption = options.map((item, i) => {
			return (
				<option key={i}>{item.name}</option>
				)
		});

		// const answers = this.props.connection.filter(conn => {
		// 	return conn.fromId === this.props.id;
		// })

		const answers = [];
		for(var key in this.props.connection){
			if(this.props.connection[key].fromId === this.props.id){
				answers.push(this.props.connection[key]);
			}
		}
		const answersDiv = answers.map((ans, i) => {
			return (
				<option key={i} value={ans.id}>
					{ans.answer}
				</option>
			)
		})

		var _thisId = this.props.id;

	    return (
	    	<div className="nodeBox">
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
	    			<form onSubmit={this.addNewAnswer}>
		    			<input ref="answer" name="answer"></input>
		    			<input type="submit" hidden />
		    			<button onClick={this.addNewAnswer}>add answer</button>
	    			</form>
	    		</div>


	    	</div>
	    )
	}
});

export default SingleForm
