import React from 'react';
import SingleForm from './SingleForm';


const Signup = React.createClass({

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
          <div>
            <label for="verify">Password</label>
            <input name="verify" type="text"/>
          </div>
        </form>
      </div>
    )
  }
});

export default Signup;
