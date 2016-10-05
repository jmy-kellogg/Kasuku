import React from 'react';

const SingleForm = React.createClass({
	addNewAnswer: function(e){
		e.preventDefault();
		// {answers}.push(this.refs.answer.value)
		//this.props.addAnswer.bind(null, this.answer.value, 1)
		console.log(this.props.addAnswer(this.refs.answer.value, 1));
	},
	// addNewNode: function(e){
	// 	console.log('second');
	// 	e.preventDefault();

	// },
	render: function(){
		const options = [{name:"Yes/No", value:"Yes/No"}, {name:"Either", value:"Either"}, {name:"Or", value:"Or"}]; 
		const repeatOption = options.map((item, i) => {
			return (
				<option key={i}>{item.name}</option>
				)
		});
		// const answers= [];
		// const repeatAnswer = answers.map((answer) => {
		// 	return (
		//    		<p>Answer: {answer}</p>
		// 		)
		// });
	    return (
	    	<div>
	    		<form>
	    		<div>
	    			<label htmlFor="type">Type: </label>
	    			<select name="type">
	    				{repeatOption}
	    			</select>
	    		</div>
	    		<div>
	    			<label htmlFor="question">Question: </label>
	    			<textarea name="question"></textarea>
	    		</div>
	    		<div>
	    			{/*repeatAnswer*/}
	    		</div>
	    		<div>
	    			<label htmlFor="answer">Answer: </label>
	    			<input ref="answer" name="answer"></input>
	    			<button onClick={this.addNewAnswer}>Add Answer</button>

	    		</div>
	    		<div>
	    			<button>Add Node</button>
	    		</div>
	    		</form>
	    	</div>
	    )
	}
});

export default SingleForm 