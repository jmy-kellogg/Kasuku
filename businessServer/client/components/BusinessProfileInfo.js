import React from 'react'
import { connect } from 'react-redux';
import { updateBusinessProfile } from '../actions/business.actions.js'
import axios from 'axios';

const BusinessProfile = React.createClass({
  handleSubmit (e) {
    e.preventDefault();
    
    const id = this.state.id;
    const businessName = this.state.businessName;
    const email = this.state.email;
    const pageToken = this.state.pageToken;
    const password = this.refs.password.value;
    const password_confirmation = this.refs.password_confirmation;
    const webhookToken = this.state.webhookToken;

    this.props.dispatch(updateBusinessProfile(id, businessName, email, pageToken, password, webhookToken))
    
  },
  getInitialState () {
    return { 
      businessName: '',
      email: '',
      pageToken: '',
      webhookToken: '',
      password: '',
    }
  },
  componentDidMount () {
    
    this.businessRequest = axios.get('/api/business/' + this.props["data-id"])
    .then( (res) => res.data )
    .then( (_business) => {
      this.setState({ ..._business })
      // this.company = _business;
    })
  },
  businessNameChange(e) {
    this.setState({ businessName: e.target.value })
  },
  emailChange(e) {
    this.setState({ email: e.target.value })
  },
  pageTokenChange (e) {
    this.setState({ pageToken: e.target.value })
  },
  webhookTokenChange (e) {
    this.setState({ webhookToken: e.target.value })
  },
  render() {
    
    return (
      <div>
      id: {this.state.id}<br/>
      businessName: {this.state.businessName}<br/>
      userName: {this.state.username}<br/>
      businessEmail: {this.state.email}<br/>
      pt: {this.state.pageToken}<br/>
      wht: {this.state.webhookToken}<br/>

      <h1>Business Info</h1>
        <form>
         
         <div className="form-group" onSubmit={this.handleSubmit}>
           <label htmlFor="business-name">Business Name:</label>
           <input type="text" className="form-control" id="business-name" ref="businessName" value={this.state.businessName} onChange={this.businessNameChange} />
         </div>

         <div className="form-group">
           <label htmlFor="email">Email address:</label>
           <input type="email" className="form-control" id="email" ref="email" value={this.state.email} onChange={this.emailChange} />
         </div>

         <div className="form-group">
           <label htmlFor="page-token">Facebook Page Token:</label>
           <input type="text" className="form-control" id="page-token" ref="pageToken" value={this.state.pageToken} onChange={this.pageTokenChange}/>
         </div>

         <div className="form-group">
           <label htmlFor="webhook-token">Facebook Webhook Token:</label>
           <input type="text" className="form-control" id="webhook-token" ref="webhookToken" value={this.state.webhookToken} onChange={this.webhookTokenChange} />
         </div>

         <div className="form-group">
           <label htmlFor="webhook-url">Facebook Webhook Url:</label> 
         </div>

         <div className="form-group">
           <label htmlFor="pwd">Password:</label>
           <input type="password" className="form-control" id="pwd" ref="password" />
         </div>

         <div className="form-group">
           <label htmlFor="pwd">Password confirmation:</label>
           <input type="password" className="form-control" id="pwd_confirmation" ref="password_confirmation"  />
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