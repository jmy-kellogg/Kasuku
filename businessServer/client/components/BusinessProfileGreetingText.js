import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { saveGreeting, deleteGreeting } from '../actions/business.actions.js';
import TooltipGlyph from './TooltipGlyph';
import Spinner from './Spinner';

const BusinessProfileGreeting = React.createClass({
  getInitialState () {
    return { 
      greeting: '',
      saveButtonText: 'Save',
      isSaving: false
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
  handleSave(e) {
    e.preventDefault();
    e.stopPropagation();
    const id = this.props["data-id"];
    const greeting = this.state.greeting;
    this.setState({saveButtonText: 'Saving...', isSaving: true})
    this.props.dispatch(saveGreeting(id, greeting));
    setTimeout(()=> {
      this.setState({saveButtonText: 'Save', isSaving: false })
    }, 500)
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
                <button onClick={this.handleSave} className="btn btn-submit"><span hidden={!this.state.isSaving}><Spinner size="16px" /></span> {this.state.saveButtonText}</button>
              </span>
            </div>
          </div>
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

