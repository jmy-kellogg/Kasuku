import React from 'react';
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';

// post name to database.  get id from database.  add id to product

const NavBar = React.createClass({

	render: function() {
  return (
  <Navbar inverse>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">React-Bootstrap</a>
        </Navbar.Brand>
          <Navbar.Toggle />
          </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  <NavItem eventKey={1} href="/product">Start</NavItem>
                  <NavItem eventKey={2} href="#">Link</NavItem>
                  <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Action</MenuItem>
                    <MenuItem eventKey={3.2}>Another action</MenuItem>
                    <MenuItem eventKey={3.3}>Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.3}>Separated link</MenuItem>
                  </NavDropdown>
                </Nav>
                <Nav pullRight>
              <NavItem eventKey={1} href="/Signup">Sign Up</NavItem>
              <NavItem eventKey={2} href="/Login">Log In</NavItem>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}
});


export default NavBar;
