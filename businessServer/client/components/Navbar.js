import React from 'react';
import { Nav, Navbar, NavItem, MenuItem, NavDropdown, inverse } from 'react-bootstrap';

// post name to database.  get id from database.  add id to product

const NavBar = React.createClass({

	render: function() {
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
        <li className="active"><a href="/chatbot/1" className="navbar-link" onClick={this.createHeadNode}>Make Bot</a></li>
        <li><a href="/businesses/1" className="navbar-link">Business</a></li>
        <li><a href="/" className="navbar-link" id="NavBarLogo">Kasuku</a></li>
        <li><a href="/Signup" className="navbar-link">Sign Up</a></li>
        <li><a href="/Login" className="navbar-link">Log In</a></li>
      </ul>
    </div>
  </div>
</nav>

  )
}
});


export default NavBar;
