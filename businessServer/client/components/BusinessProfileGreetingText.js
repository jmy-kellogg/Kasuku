import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { saveGreeting, deleteGreeting } from '../actions/business.actions.js';
import TooltipGlyph from './TooltipGlyph';

const BusinessProfileGreeting = React.createClass({
  getInitialState () {
    return { 
      greeting: ''
    }
  },
  componentDidMount () {
    // console.log(this.props["data-id"], "THIS> PROPS NLSDJ")
    this.businessRequest = axios.get('/api/business/' + this.props["data-id"])
    .then( (res) => res.data )
    .then( (_business) => {
      // console.log(_business)
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
    const INITIAL_GREETING_INFO = 'This will greet users the first time they engage with you on your page'
    return (
      <div className="business-greeting"> 
        <form>
          <div className="form-group" onSubmit={this.handleSubmit}>
            <label htmlFor="first-question">Initial greeting to first time user:&nbsp;</label><TooltipGlyph tip={INITIAL_GREETING_INFO}/>
            <div className="input-group">
              <input type="text" className="form-control" id="greeting-text" value={this.state.greeting} onChange={this.greetingChange} />
              <span className="input-group-btn">
                <button onClick={this.handleSave} className="btn btn-primary">Save</button>
              </span>
            </div>
          </div>
         {/*<button type="button" onClick={this.handleDelete} className="btn btn-danger">Delete Greeting</button>*/}
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

