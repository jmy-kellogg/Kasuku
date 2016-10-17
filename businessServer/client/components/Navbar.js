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

<nav id="navbar-primary" className="navbar" role="navigation">
  <div>

    <div className="navbar-header">
      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-primary-collapse">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
    </div>
    <div className="collapse navbar-collapse" id="navbar-primary-collapse">
      <ul className="nav navbar-nav">
        <li className="active"><a href="/chatbot/1" onClick={this.createHeadNode}>Make Bot</a></li>
        <li><a href="/businesses/1">Business</a></li>
        <li><a href="/" id="NavBarLogo">ChatterBot</a></li>
        <li><a href="/Signup">{ displaySignupLogin ? 'Sign Up' : 'Help' }</a></li>
        <li><a href="/Login">{ displaySignupLogin ? 'Log In' : 'Signout' }</a></li>
      </ul>
    </div>
  </div>
</nav>

  )
}
});


export default NavBar;
