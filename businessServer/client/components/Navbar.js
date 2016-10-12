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
        <li className="active"><a  href="/chatbot/1">Make Bot</a></li>
        <li><a href="/businesses/1">Business</a></li>
        <li><a href="/" id="NavBarLogo">ChatterBot</a></li>
        <li><a href="/Signup">Sign Up</a></li>
        <li><a href="/Login">Log In</a></li>
      </ul>
    </div>
  </div>
</nav>

  )
}
});


export default NavBar;
