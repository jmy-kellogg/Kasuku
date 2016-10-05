//import 'bootstrap/dist/css/bootstrap.css'
import React from 'react';
import { Link } from 'react-router';
import NavBar from './Navbar';
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import SingleForm from './SingleForm';
//import bootstrap from 'bootstrap/dist/css/bootstrap.css'

const Signup = React.createClass({
  render() {
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
        <NavBar/>
      </div>
    )
  }
});

export default Signup;
