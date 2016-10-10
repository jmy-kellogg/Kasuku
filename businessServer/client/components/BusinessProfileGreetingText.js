import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { saveGreeting, deleteGreeting } from '../actions/business.actions.js';

const BusinessProfileGreeting = React.createClass({
  getInitialState () {
    return { 
      greeting: ''
    }
  },
  componentDidMount () {
    this.businessRequest = axios.get('/api/business/' + this.props["data-id"])
    .then( (res) => res.data )
    .then( (_business) => {
      console.log(_business)
      this.setState({ greeting: _business.greeting })
    })
  },
  greetingChange(e) {
    this.setState({ greeting: e.target.value })
  },
  handleSave() {
    const id = this.props["data-id"];
    const greeting = this.state.greeting;

    this.props.dispatch(saveGreeting(id, greeting));
  },
  handleDelete() {
    const id = this.props["data-id"];
    this.props.dispatch(deleteGreeting(id))
  },
  render (){
    return (
      <div>
      HIHI- {this.props["data-id"]}
        <h1>Initial Greeting</h1>
        <form>
         <div className="form-group" onSubmit={this.handleSubmit}>
           <label htmlFor="greeting-text">Greeting Text</label>
           <input type="text" className="form-control" id="greeting-text" value={this.state.greeting} onChange={this.greetingChange} />
         </div>

         <button type="button" onClick={this.handleSave} className="btn btn-primary">Save</button>
         <button type="button" onClick={this.handleDelete} className="btn btn-danger">Delete Greeting</button>
        </form>
      </div>
    )
  }
});

function mapStateToProps (state) {
  return {
    business: state.business
  }
}

const BusinessProfileGreetingText = connect(mapStateToProps)(BusinessProfileGreeting)

export default BusinessProfileGreetingText;

