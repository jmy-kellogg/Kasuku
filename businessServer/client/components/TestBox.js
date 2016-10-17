import React from 'react';
import axios from 'axios';

const TestBox = React.createClass({
  // set messages on the state
  // messages will be an array of objects
  getInitialState: function(){
    return {
      messages: [],
      showTest: false
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
    .then( () => {
      $("#ChatLog-container").animate({ scrollTop: $("#ChatLog-container")[0].scrollHeight}, 1000);
    })
  },

  toggleChat (e) {
    e.preventDefault();
    let newStatus = !this.state.showTest;
    this.setState( { showTest: newStatus})
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
      <div id="text-box-container">
        <div className="test-box" id="test-container" hidden={this.state.showTest} >

          <div id="ChatLog-container">
            <ul className="ChatLog">
              {messagesDiv}
            </ul>
          </div>

          <form className="test-form">
            <div className="form-group" >
              <div className="input-group" id="chat-input">
                <input className="form-control" ref="messageInput"  />
                <span className="input-group-btn">
                  <button className="test-send-btn" onClick={this.sendMessage}>
                    <img className="test-send-img" src={require('./images/send2.jpg')}/>
                  </button>
                </span>
              </div>
            </div>
          </form>
        </div>
        <div>
          <button id="toggleChatbox" onClick={this.toggleChat} className="btn btn-xs btn-success">{this.state.showTest ? 'Test' : 'Hide'}</button>
        </div>
      </div>
    )

  }
})

export default TestBox

