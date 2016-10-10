//import 'bootstrap/dist/css/bootstrap.css'
import React from 'react';
import { Link } from 'react-router';
import NavBar from './Navbar';
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap'; 



const Main = React.createClass({
  
  render: function() {
    return (
      <div>
        <NavBar/>
        {React.cloneElement(this.props.children, this.props)}
      </div>     
    )
  }
});

export default Main;
