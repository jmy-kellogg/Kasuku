import React from 'react';
import SingleForm from './SingleForm';
import { connect } from 'react-redux'
import { signup } from '../actions/signup.action.js';
import axios from 'axios';


// console.log(signup);

const Signup = React.createClass({
  contextTypes: {
        router: React.PropTypes.object
  },
  handleSubmit (e) {
    e.preventDefault();
    const username = this.refs.username.value;
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const password_confirmation = this.refs.password_confirmation.value;

    
  axios.post('/api/business', { username, email, password })
  .then( (res) => {
    console.log("In here", res.data);
    console.log("router", this.props.history, this.props)
    this.props.history.push(`/businesses/${res.data.id}`);
  })
  .catch ( (err) => {
    console.log(err)
  })


  },
  render () {
    console.log(this.props);
    return (
      <div className="SingleFormPage">
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input className="form-control"
                    type="text"
                    id="username"
                    name="username"
                    ref="username"
                    value={this.props.username}
                    placeholder="enter username" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input className="form-control"
                    type="email"
                    id="email"
                    name="email"
                    ref="email"
                    value={this.props.email}
                    placeholder="enter email" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="form-control"
                    type="password"
                    id="password"
                    name="password"
                    ref="password"
                    value={this.props.password}
                    placeholder="enter password" />
          </div>

          <div className="form-group">
            <label htmlFor="password_confirmation">Confirm password</label>
            <input className="form-control"
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    ref="password_confirmation"
                    value={this.props.password_confirmation}
                    placeholder="confirm password" />
          </div>
          <button className="btn btn-submit" type="submit">Signup</button>
        </form>
      </div>
    )
  }
});

function mapStateToProps (store) { return { business: store.business } }

export default connect(mapStateToProps)(Signup);
