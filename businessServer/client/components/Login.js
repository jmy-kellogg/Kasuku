import React from 'react';
import SingleForm from './SingleForm';


const Login = React.createClass({

  render: function() {
    return (
      <div className="LoginPage">
        <form>
          <div>
            <label for="username">User Name</label>
            <input className="form-control" name="username" type="text"/>
          </div>
          <div>
            <label for="password">Password</label>
            <input className="form-control" name="password" type="password"/>
          </div>
          <div>
            <button className="btn btn-submit" type="submit">Login</button>
          </div>
        </form>
      </div>
    )
  }
});

export default Login;
