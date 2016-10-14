import React from 'react';
import fetch from 'isomorphic-fetch';
import polyfill from 'es6-promise';
import InlineEdit from './InlineEdit';
import axios from 'axios';
// added this ------------------//
import classNames from 'classnames';

const SingleForm = React.createClass({

	// componentDidMount(){
	// 	console.log(this.refs.hello);
	// 	this.refs.hello.value = this.props.question;
	// 	// this.refs[`question${this.props.id}`].defaultValue = this.props.question;
	// },

	// componentDidUpdate(){
	// 	console.log(this.refs.hello);
	// 	this.refs[`question${this.props.id}`].value = this.props.question;
	// 	// this.refs[`question${this.props.id}`].defaultValue = this.props.question;
 //   },

	getInitialState: function() {
    return {
    		...this.state,
    		currentAnswer: null,
        questionValue: this.props.question,
        connectionToUpdate: null
    	};
  },
  onTextChange: function(e){
    this.setState({questionValue: e.target.value})

  },
	selectAnswer: function(answer, e){
		e.preventDefault();
		console.log(answer);
		this.state.currentAnswer= answer.id;
    this.props.setSelected(answer, this.props.layer);
    this.setState({connectionToUpdate: null})
	},
	removeNode: function(e){

		var nodes = this.props.node;
		var connections = this.props.connection;
		// id of this node is this.props.id
		// get all connections that are associated with this node
		// get all nodes that are connected to those connections
		var nodesForRemoval = [];
		var connsForRemoval = [];

    // connections.forEach(connection => {
    //   if(connection.fromId === nodeId){
    //     connsForRemoval.push(connection.id);
    //     if(connections[connection.id].toId){
    //       getAllForRemoval(connections[connection.id].toId);
    //     }
    //   }
    // })
    // var queue = [].concat(nodes[this.props.id].conns);
    // while(queue.length > 0){
    //   queue.forEach(conn => {

    //   })
    // }
    var visited =[];

		var getAllForRemoval = function(nodeId){

      if(nodes[nodeId].conns){
  			nodes[nodeId].conns.forEach(connId => {
  				connsForRemoval.push(connId);
          if(connections[connId].toId && !visited.includes(connections[connId].toId)){
            visited.push(connections[connId].toId)
            getAllForRemoval(connections[connId].toId);
          }
        })
    			    nodesForRemoval.push(nodeId);
      }
		}
		getAllForRemoval(this.props.id);
    console.log(connsForRemoval);
    console.log(nodesForRemoval);

		//delete all nodes and associated connections branching from this node
		axios.delete(`/api/nodes/${this.props.id}`)
			.then(item => item.data)
			.then(item => {
				// console.log(item);
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
		// var price = +this.refs.price.value;
		// var description = this.refs.description.value;

		this.refs.answer.value = "";
		var fromId = this.props.id;
		axios.post('/api/connections', {
			answer,
			fromId,
			productId: this.props.prodSelected,
			// price,
			// description
		})
		.then(conn => conn.data)
		.then(conn => {
			// set business ID once business ids are set up.  but keep as null for now.
			var businessId = null;
			this.props.addAnswerAction(conn.id, conn.answer, conn.fromId, businessId);
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


		var layer = this.props.layer+1;
    // add new node to the next level
    if(!this.props.connection[answerId].toId){
  		axios.post('/api/nodes/', {
  			question: "default question",
  			productId: this.props.prodSelected,
  			topLevel: false,
  			layer: layer
  		})
  		.then(node => node.data)
  		.then(node => {
  			this.props.addNewNode(answerId, node.id, node.layer, false, node.productId);
  			return node;
  		})
  		.then(node => {
  			axios.put(`/api/connections/${currentConn.id}`, {
  				toId: node.id
  			})
  		})
      .catch(err => {
        if(err) throw err;
      })
    }


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

  changeOptionValue (answer, e) {
    e.preventDefault();
    this.props.connection[answer.id].answer = e.target.value;
    this.setState({connectionToUpdate: answer});
    console.log(this.state.connectionToUpdate);
    console.log("ANSWER", answer);
    console.log(this.state);
    console.log(this.props.connection[answer.id]);
  },

  updateConnection (answer, e) {
    console.log(this.state.connectionToUpdate);
    console.log(answer);
    axios.put(`/api/connections/${answer.id}`, answer)
    .then( (val) => { console.log(val) })
  },

	render: function(){

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
        "input-group": true,
        active: this.state.currentAnswer === ans.id
      });
      // TODO: GIVE ANSWER DIV A HEIGHT AND SET SCROLL / OVERFLOW

			return (
        <div key={i} className="form-group">
  				<div className={divClassName} key={i} value={ans.id} onClick={this.selectAnswer.bind(this, ans)}>
  					{/*<label><h4>{ans.answer}</h4></label>*/}
            <input className="form-control" value={ans.answer} onChange={this.changeOptionValue.bind(this, ans)} onBlur={this.updateConnection.bind(this, ans)} />
            <span className="input-group-btn">
              <button className="btn btn-primary" onClick={this.addNewNode.bind(this, ans.id)}><span className="glyphicon glyphicon-plus"></span></button>
            </span>
  				</div>
        </div>
			)
		})


	    return (

	    	<div className="panel panel-primary nodeBox fade-in">

					<button className="btn-remove" onClick={this.removeNode}>x</button>

	    		<div className="panel-heading formQuest">
	    			<h4><b>Question: </b></h4>
            {this.props.question}

          </div>
          <div className="panel-body">
            <div ref="answerSelect">
              <h4><b>Answers:</b></h4>
              {answersDiv}
            </div>
            <div className="add-answer">
              <form className="form" onSubmit={this.addNewAnswer}>
                <div className="form-group">
                  <div className="input-group">
                    <input type="text" className="form-control" ref="answer" name="answer" placeholder="add an answer to your question"></input>
                    <span className="input-group-btn">
                      <button className="btn btn-success" onClick={this.addNewAnswer}>add answer</button>
                    </span>
                  </div>
                </div>

                {/*<label htmlFor="price">Added price: </label>
                <input ref="price" name="price"></input>
                <label htmlFor="description">Log: </label>
                <input ref="description" name="description"></input>*/}
                <input type="submit" hidden />
              </form>
            </div>

	    		</div>
	    	</div>
	    )
	}

});

export default SingleForm
            // <InlineEdit data={this.props.question} defaultValue={this.props.question} i={this.props.id} id={`question${_thisId}`} ref={`question${_thisId}`} onBlur={this.handleChange.bind(this, _thisId)}/>
          			// <textArea className="" onChange={this.onTextChange} value={this.state.questionValue} id={`question${_thisId}`} ref={`question${_thisId}`} onBlur={this.handleChange.bind(this, _thisId)}/>
