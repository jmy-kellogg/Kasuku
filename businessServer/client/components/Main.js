//import 'bootstrap/dist/css/bootstrap.css'
import React from 'react';
import { Link } from 'react-router';
import NavBar from './Navbar';
import { Nav, Navbar, NavItem, MenuItem, NavDropdown } from 'react-bootstrap'; 
import SingleForm from './SingleForm';
//import bootstrap from 'bootstrap/dist/css/bootstrap.css'

const Main = React.createClass({
  render: function() {
    return (
      <div>
        <h1>
          <Link to="/">ChatBot 3000</Link>
        </h1>
        <NavBar/>
        <SingleForm/>
        <pre>
          {JSON.stringify(this.props.connection)}
        </pre>
      </div>     
    )
  }
});

export default Main;
