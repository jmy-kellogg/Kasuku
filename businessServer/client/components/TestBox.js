import React from 'react';
import axios from 'axios';

const TestBox = React.createClass({
  // set messages on the state
  // messages will be an array of objects
  getInitialState: function(){
    return {
      messages: []
    }
  },

  sendMessage: function(e){
    e.preventDefault();
    $('#test-container').scrollTop = $('#test-container').scrollHeight;

    var message = this.refs.messageInput.value;
    this.refs.messageInput.value = "";
    this.setState({
      messages: this.state.messages.concat([{message: message, fromUser: true}])
    })
    axios.post('/api/convoTest', {
      input: message
    })
    .then(res => res.data)
    .then(response => {
      this.setState({
        messages: this.state.messages.concat([{message: response.message, fromUser: false}])
      })
    })
  },

  render: function(){
    const messagesDiv = this.state.messages.map((message,i) => {
      return (
        <li key={i} className={message.fromUser ? "ChatLog__entry ChatLog__entry_mine" : "ChatLog__entry"}  >
          <p className="ChatLog__message">
            {message.message}
          </p>
        </li>
      )
    })
    return (
      <div className="test-box" id="test-container">

        <div>
          <ul className="ChatLog">
            {messagesDiv}
          </ul>
        </div>

        <form className="test-form">
        <input className="test-input" ref="messageInput"/>
        <button className="test-send-btn" onClick={this.sendMessage}>
          <img className="test-send-img" src={require('./images/send2.jpg')}/>
        </button>
        </form>
      </div>
    )

  }
})

export default TestBox
