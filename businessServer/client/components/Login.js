import React from 'react';
import SingleForm from './SingleForm';


const Login = React.createClass({
  
  render: function() {
    return (
      <div>
        <form>
          <div>
            <label for="username">User Name</label>
            <input name="username" type="text"/>
          </div>
          <div>
            <label for="password">Password</label>
            <input name="password" type="password"/>
          </div>
        </form>
      </div>
    )
  }
});

export default Login;
