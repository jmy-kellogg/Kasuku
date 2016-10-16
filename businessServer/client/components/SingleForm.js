import React from 'react';
import fetch from 'isomorphic-fetch';
import polyfill from 'es6-promise';
import InlineEdit from './InlineEdit';
import axios from 'axios';
// added this ------------------//
import classNames from 'classnames';
import ContentEditable from 'react-contenteditable'

const SingleForm = React.createClass({

  getInitialState: function() {
    return {
        ...this.state,
        currentAnswer: null,
        questionValue: this.props.question,
        connectionToUpdate: null,
        questionId: null
      };
  },
  onTextChange: function(e){
    this.setState({questionValue: e.target.value})

  },
  selectAnswer: function(answer, e){
    e.preventDefault();
    console.log(answer);
    this.state.currentAnswer= answer.id;
    this.props.setSelected(answer, this.props.layer, this.props.node);
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

    // // the array of top level nodes
    // // this.props.topLevelNodes[this.props.prodSelected];
    // // the index of the array
    // // this.props.data.topLevelNodeIndex

    var nextTreePointer;


    if(this.props.data.topLevelNodeIndex === this.props.topLevelNodes[this.props.prodSelected].length-1){
      nextTreePointer = null;
    }
    else{
      nextTreePointer = this.props.topLevelNodes[this.props.prodSelected][this.props.data.topLevelNodeIndex+1].id;
    }
    console.log(nextTreePointer);

		this.refs.answer.value = "";

		var fromId = this.props.id;
		axios.post('/api/connections', {
			answer,
			fromId,
			productId: this.props.prodSelected,
      toId: nextTreePointer,
      businessId: this.props.params.businessId,
			price,
			description
		})
		.then(conn => conn.data)
		.then(conn => {
			// set business ID once business ids are set up.  but keep as null for now.
			var businessId = null;
			this.props.addAnswerAction(conn.id, conn.answer, conn.fromId, conn.toId, businessId);
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
    // commented out if statement is to prevent adding a new node if the connection already points to a node.  prevent duplicates.  but the new design has new nodes pointing to the next top level node by default.
    var createNewNode = function(){
      axios.post('/api/nodes/', {
        question: "default question",
        productId: this.props.prodSelected,
        topLevel: false,
        layer,
        topLevelNodeIndex: this.props.data.topLevelNodeIndex,
        leafNode: true
      })
      .then(node => node.data)
      .then(node => {
        this.props.addNewNode(answerId, node.id, node.layer, false, node.productId, this.props.data.topLevelNodeIndex, true);
        this.props.removeLeafNode(this.props.id);
        return node;
      })
      .then(node => {
        axios.put(`/api/connections/${answerId}`, {
          toId: node.id
        })
      })
      .catch(err => {
        if(err) throw err;
      })

    }
    if(!this.props.connection[answerId].toId){
      createNewNode.call(this);
    }
    else{
      if(this.props.node[this.props.connection[answerId].toId].topLevel){
        createNewNode.call(this);
      }
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
  },

  updateConnection (answer, e) {
    axios.put(`/api/connections/${answer.id}`, answer)
    .then( (val) => { console.log(val) })
  },

  changeQuestion (e) {
    this.setState({questionValue: e.target.value});
  },

  updateQuestion (e) {
    axios.put(`/api/nodes/${this.props.id}`, { question: this.state.questionValue})
    .then( (res) => {
      this.setState({currentQuestion: res.data.question})
      this.forceUpdate();
    })
  },

  render: function(){

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
              <button className="btn btn-primary btnAdd" onClick={this.addNewNode.bind(this, ans.id)}><span className="glyphicon glyphicon-plus"></span></button>
            </span>
          </div>
        </div>
      )
    })


      return (

        <div className="panel panel-primary nodeBox fade-in">

          <button className="btn-remove" onClick={this.removeNode}>x</button>

          <div className="formQuest">
            <h4><b>Question: </b></h4>
            <ContentEditable
              html={this.props.question} // innerHTML of the editable div
              disabled={false}       // use true to disable edition
              onChange={this.changeQuestion}
              onBlur={this.updateQuestion}
            />
            {/*<p contentEditable={true}>{this.props.question}</p>*/}

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
                      <button className="btn btn-success btnAdd" onClick={this.addNewAnswer}>add answer</button>
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
