import React from 'react';
import { Nav, Navbar, NavItem, MenuItem, NavDropdown, inverse } from 'react-bootstrap';

// post name to database.  get id from database.  add id to product

const NavBar = React.createClass({

	render: function() {
  return (
    // <Navbar inverse>
    //     <Navbar.Brand>
    //      <a href="/">ChatterBot</a>
    //     </Navbar.Brand>
    //       <Navbar.Toggle />
    //         <Navbar.Collapse>
    //             <Nav pullRight>
    //             <NavItem eventKey={1} href="/product">Make ChatterBot</NavItem>
    //             <NavItem eventKey={2} href="/businesses/1">Your Business</NavItem>

    //           <NavItem eventKey={1} href="/Signup">Sign Up</NavItem>
    //           <NavItem eventKey={2} href="/Login">Log In</NavItem>
    //         </Nav>
    //     </Navbar.Collapse>
    // </Navbar>

<nav id="navbar-primary" className="navbar" role="navigation">
  <div className="container-fluid">

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
        <li className="active"><a  href="/product">Make Bot</a></li>
        <li><a href="/businesses/1">Business</a></li>
        <li><a href="/">ChatterBot</a></li>
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
