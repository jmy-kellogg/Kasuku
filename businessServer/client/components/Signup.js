import React from 'react';
import SingleForm from './SingleForm';
import store from '../store';
import signup from '../actions/signup.action.js';

console.log(signup);

const Signup = React.createClass({
  handleSubmit (e) {
    e.preventDefault();
    const username = this.refs.username.value;
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const password_confirmation = this.refs.password_confirmation.value;
    // console.log(username, email, password, password_confirmation);

    store.dispatch(signup(username, email, password, password_confirmation));

  },
  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(null)} noValidate>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input className="form-control"
                    type="text"
                    id="username"
                    name="username"
                    ref="username"
                    value={this.props.username}
                    placeholder="enter a username" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input className="form-control"
                    type="email"
                    id="email"
                    name="email"
                    ref="email"
                    value={this.props.email}
                    placeholder="enter a email" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="form-control"
                    type="password"
                    id="password"
                    name="password"
                    ref="password"
                    value={this.props.password}
                    placeholder="enter a password" />
          </div>

          <div className="form-group">
            <label htmlFor="password_confirmation">Confirm password</label>
            <input className="form-control"
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    ref="password_confirmation"
                    value={this.props.password_confirmation}
                    placeholder="confirm your password" />
          </div>
          <button className="btn btn-success" type="submit">Signup</button>
        </form>
      </div>
    )
  }
});

export default Signup;
