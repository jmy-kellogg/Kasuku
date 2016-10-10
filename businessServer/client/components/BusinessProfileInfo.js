import React from 'react'
import { connect } from 'react-redux';
import { updateBusinessProfile } from '../actions/business.actions.js'
import axios from 'axios';

const BusinessProfile = React.createClass({
  handleSubmit (e) {
    e.preventDefault();
    
    const id = this.props.business[0].id;
    const businessName = this.refs.businessName;
    const email = this.refs.email;
    const pageToken = this.refs.pageToken;
    const password = this.refs.password;
    const webhookToken = this.refs.webhookToken;

    console.log("handle submit for business profile info")
  },
  getInitialState () {
    return { 
      businessName: '',
      email: '',
      pageToken: '',
      webhookToken: ''
    }
  },
  componentDidMount () {
    axios.get('/api/business/' + this.props["data-id"])
    .then( (res) => res.data )
    .then( function (business) {
      console.log("I go the business", business);

      return business;
    })
  },
  render() {
    const business = this.props.business[0] || {};
    console.log("Business", business);
    console.log("Params", this.props);
    console.log("State", this.state);
    return (
      <div>
      <h1>Business Info</h1>
        <form>
         
         <div className="form-group" onSubmit={this.handleSubmit}>
           <label htmlFor="business-name">Business Name:</label>
           <input type="text" className="form-control" id="business-name" ref="businessName" value={business.businessName} />
         </div>

         <div className="form-group">
           <label htmlFor="email">Email address:</label>
           <input type="email" className="form-control" id="email" ref="email" value={business.email} />
         </div>

         <div className="form-group">
           <label htmlFor="page-token">Facebook Page Token:</label>
           <input type="text" className="form-control" id="page-token" ref="pageToken" value={business.pageToken} />
         </div>

         <div className="form-group">
           <label htmlFor="webhook-token">Facebook Webhook Token:</label>
           <input type="text" className="form-control" id="webhook-token" ref="webhookToken" value={business.webhookToken} />
         </div>

         <div className="form-group">
           <label htmlFor="webhook-url">Facebook Webhook Url:</label> 
         </div>

         <div className="form-group">
           <label htmlFor="pwd">Password:</label>
           <input type="password" className="form-control" id="pwd" ref="password" value={business.password} />
         </div>

         <div className="form-group">
           <label htmlFor="pwd">Password confirmation:</label>
           <input type="password_confirmation" className="form-control" id="pwd_confirmation" ref="password_confirmation" value={business.password} />
         </div>

         <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Update</button>
       </form>
      </div>
    ) 
  }
})

function mapStateToProps (state) {
  return {
    business: state.business
  }
}

const BusinessProfileInfo = connect(mapStateToProps)(BusinessProfile)

export default BusinessProfileInfo