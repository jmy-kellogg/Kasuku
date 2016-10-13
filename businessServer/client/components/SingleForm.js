import React from 'react';
import fetch from 'isomorphic-fetch';
import polyfill from 'es6-promise';
import InlineEdit from './InlineEdit';
import axios from 'axios';
// added this ------------------//
import classNames from 'classnames';

const SingleForm = React.createClass({
	getInitialState: function() {
    return {
    		...this.state,
    		currentAnswer: null
    	};
  },
	selectAnswer: function(answerId, e){
		e.preventDefault();
		// console.log(answerId)
		this.state.currentAnswer= answerId;
	},
	removeNode: function(e){

		var nodes = this.props.node;
		var connections = this.props.connection;
		// id of this node is this.props.id
		// get all connections that are associated with this node
		// get all nodes that are connected to those connections
		var nodesForRemoval = [];
		var connsForRemoval = [];


		var getAllForRemoval = function(nodeId){
			nodes[nodeId].conns.forEach(connId => {
				connsForRemoval.push(connId);
				if(connections[connId].toId){
					getAllForRemoval(connections[connId].toId);
				}
			})
			nodesForRemoval.push(nodeId);
		}
		getAllForRemoval(this.props.id);



		//delete all nodes and associated connections branching from this node
		axios.delete(`/api/nodes/${this.props.id}`)
			.then(item => item.data)
			.then(item => {
				console.log(item);
			})
			.catch(err => {
				if(err) throw err;
			})

		// remove those nodes from state
		this.props.removeNodesAction(nodesForRemoval);

		// remove those connections from state
		this.props.removeConnectionsAction(connsForRemoval);


	},
	addNewAnswer: function(e){

		e.preventDefault();
		var answer = this.refs.answer.value;
		var price = +this.refs.price.value;
		var description = this.refs.description.value;

		this.refs.answer.value = "";
		var fromId = this.props.id;
		axios.post('/api/connections', {
			answer,
			fromId,
			productId: this.props.prodSelected,
			price,
			description
		})
		.then(conn => conn.data)
		.then(conn => {
			// set business ID once business ids are set up.  but keep as null for now.
			var businessId = null;
			this.props.addAnswerAction(conn.id, conn.answer, conn.fromId, businessId, price, description);
		})
		.catch(e => {
			if(e) throw e;
		})
	},
	addNewNode: function(answerId, e){
		e.preventDefault();
		// var connId = this.refs.answerSelect.value;
    this.selectAnswer(answerId, e)
    var connId = this.state.currentAnswer;
		var currentConn = this.props.connection[connId];
    console.log("THIS IS SOME STUFF", currentConn, connId);


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
			axios.put(`/api/connections/${currentConn.id}`, {
				toId: node.id
			})
			.then(conn => {
			})
		})

	},
	handleChange: function(nodeId, e){
    var val = e.target.value;

    axios.put(`/api/nodes/${nodeId}`, {
        question: val
    })
    .then(updatedNode => updatedNode.data)
    .then(updatedNode => {
    	this.props.saveNode(val, nodeId);
    })

  },

	render: function(){

		// console.log(this.props.node);
		// console.log(this.props.connection);



		const options = [{name:"YesNo", value:"YesNo"}, {name:"Multiple", value:"Multiple"}, {name:"Either", value:"Either"}, {name: "Quantity", value:"Quantity"}];
		const repeatOption = options.map((item, i) => {
			return (
				<option key={i}>{item.name}</option>
				)
		});


		const answers = [];
		for(var key in this.props.connection){
			if(this.props.connection[key].fromId === this.props.id){
				answers.push(this.props.connection[key]);
			}
		}

		const answersDiv = answers.map((ans, i) => {
      // added this //
      let divClassName = classNames({
        answer: true,
        active: this.state.currentAnswer === ans.id
      });
			return (
				<div className={divClassName} key={i} value={ans.id} onClick={this.selectAnswer.bind(this, ans.id)}>
					{ans.answer}
          <button className="btn btn-primary" onClick={this.addNewNode.bind(this, ans.id)}><span className="glyphicon glyphicon-plus"></span></button>
				</div>
			)
		})


		var _thisId = this.props.id;

	    return (

	    	<div className="nodeBox">

					<button className="btn-remove" onClick={this.removeNode}>x</button>

	    		<div className="formQuest">
	    			<h4>Question: </h4>
          			<InlineEdit defaultValue={this.props.question} id={`question${_thisId}`} ref={`question${_thisId}`} onBlur={this.handleChange.bind(this, _thisId)}/>
	    		</div>
	    		<div>
	    			<div ref="answerSelect">
	    				{answersDiv}
	    			</div>
	    			<button className="btn-form" onClick={this.addNewNode}>add node</button>
	    			

            <label htmlFor="answer">Answer: </label>
            <form className="form" onSubmit={this.addNewAnswer}>
	    				<label htmlFor="answer">Answer: </label>
		    			<input ref="answer" name="answer"></input>
		    			<label htmlFor="price">Added price: </label>
		    			<input ref="price" name="price"></input>
		    			<label htmlFor="description">Log: </label>
		    			<input ref="description" name="description"></input>
		    			<input type="submit" hidden />
		    			<button className="btn-form" onClick={this.addNewAnswer}>add answer</button>
	    			</form>
	    		</div>


	    	</div>
	    )
	}
});

export default SingleForm
