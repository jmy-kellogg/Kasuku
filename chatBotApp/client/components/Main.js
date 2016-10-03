//import 'bootstrap/dist/css/bootstrap.css'
import React from 'react';
import { Link } from 'react-router';
import NavBar from './Navbar';
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
//import bootstrap from 'bootstrap/dist/css/bootstrap.css'

const Main = React.createClass({
  render() {
    return (
      <div>
        <h1>
          <Link to="/">ChatBot 3000</Link>
        </h1>
        <NavBar/>
      </div>
    )
  }
});

export default Main;
