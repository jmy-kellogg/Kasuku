import React from 'react';
import fetch from 'isomorphic-fetch';
import polyfill from 'es6-promise';

const SingleForm = React.createClass({

	addNewAnswer: function(e){
		console.log(this.props.connection);

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

		this.props.addNewNode(c.id, newId);

	},
	saveNode: function(e){
		var q = this.refs.question.value;
		var thisId = this.props.i;
		this.props.saveNode(q, thisId);
		e.preventDefault();
	},

	render: function(){
		console.log(this.props.connection);
		console.log(this.props.node);


		const options = [{name:"Yes/No", value:"Yes/No"}, {name:"Either", value:"Either"}, {name:"Or", value:"Or"}];
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
		console.log(answers)
		// <button ref={i} onClick={this.addNewNode}>Add Node</button>

		// const answers= [];
		// const repeatAnswer = answers.map((answer) => {
		// 	return (
		//    		<p>Answer: {answer}</p>
		// 		)
		// });
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
	    			<label htmlFor="question">Question: </label>
	    			<textarea ref="question" name="question"></textarea>
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
	    			{JSON.stringify()}
	    			<button onClick={this.addNewAnswer}>add answer</button>
	    		</div>
	    		<button onClick={this.saveNode}>save</button>
	    		</form>

	    	</div>
	    )
	}
});

export default SingleForm
