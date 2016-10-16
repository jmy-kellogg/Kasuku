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

    var message = this.refs.messageInput.value;
    this.refs.messageInput.value = "";
    this.setState({
      messages: this.state.messages.concat([{message: message, fromUser: true}])
    })
    // this.state.messages.push({
    //   message: message,
    //   fromUser: true
    // })
    axios.post('/api/convoTest', {
      input: message
    })
    .then(res => res.data)
    .then(response => {
      this.setState({
        messages: this.state.messages.concat([{message: response.message, fromUser: false}])
      })
      console.log(this.state.messages);
    })
    // console.log(message);
  },

  render: function(){
    const messagesDiv = this.state.messages.map(message => {
      return (
        <li className="ChatLog__entry ChatLog__entry_mine">
          <p className="ChatLog__message">
            {message.message}
          </p>
        </li>
      )
    })
    return (
      <div className="test-box">

        <div>
          <ul className="ChatLog">
            {messagesDiv}
          </ul>
        </div>

        <form>
        <input ref="messageInput"/>
        <button onClick={this.sendMessage}>send</button>
        </form>
      </div>
    )

  }
})



export default TestBox
