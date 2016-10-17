import React from 'react';
import { Nav, Navbar, NavItem, MenuItem, NavDropdown, inverse } from 'react-bootstrap';

// post name to database.  get id from database.  add id to product

const NavBar = React.createClass({
  getInitialState() {
    return {
      displaySave: true,
      displayLogin: true
    }
  },
	render: function() {
    let displaySignupLogin = !(document.URL.match('/businesses') || document.URL.match('/chatbot'))
  return (

<div id="theNavbar" className="navbar-container" >
  <div className="navbar-mini-container">

    <span className="navbar-item active"><a href="/chatbot/1" className="navbar-link" onClick={this.createHeadNode}>Make Bot</a></span>
    <span className="navbar-item"><a href="/businesses/1" className="navbar-link">Business</a></span>
    <span id="navbar-logo"><a href="/" className="navbar-link" id="NavBarLogo">KASUKU</a></span>
    <span className="navbar-item"><a href="/Signup" className="navbar-link">{ displaySignupLogin ? 'Sign Up' : 'Help' }</a></span>
    <span className="navbar-item"><a href="/Login" className="navbar-link">{ displaySignupLogin ? 'Log In' : 'Signout' }</a></span>
  </div>
</div>

  )
}
});


export default NavBar;
