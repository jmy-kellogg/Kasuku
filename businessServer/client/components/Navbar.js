import React from 'react';
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';

// post name to database.  get id from database.  add id to product

const NavBar = React.createClass({

	render: function() {
  return (
  <Navbar inverse>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">ChatterBot</a>
        </Navbar.Brand>
          <Navbar.Toggle />
          </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  {/*<NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Action</MenuItem>
                    <MenuItem eventKey={3.2}>Another action</MenuItem>
                    <MenuItem eventKey={3.3}>Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.3}>Separated link</MenuItem>
                  </NavDropdown>*/}
                </Nav>
                <Nav pullRight>
                <NavItem eventKey={1} href="/product">Make ChatterBot</NavItem>
                <NavItem eventKey={2} href="/businesses/1">Your Business</NavItem>

              <NavItem eventKey={1} href="/Signup">Sign Up</NavItem>
              <NavItem eventKey={2} href="/Login">Log In</NavItem>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}
});


export default NavBar;
