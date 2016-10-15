import React from 'react'
import { connect } from 'react-redux';
import { updateBusinessProfile } from '../actions/business.actions.js'
import axios from 'axios';
import PwordField from './PwordField';

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
      pTokenType: 'password',
      wTokenType: 'password',
      pText: 'show',
      wText: 'show',
      webhookUrl: ''
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
  changePTokenType (e) {
    e.preventDefault();
    let newPtoken = this.state.pTokenType === 'input' ? 'password' : 'input';
    let newPText = this.state.pTokenTYpe === 'input' ? 'hide' : 'show'
    this.setState({
      pTokenType: newPtoken,
      pText: newPText
    })
  },
  changeWTokenType (e) {
    e.preventDefault()
    let newWtoken = this.state.wTokenType === 'input' ? 'password' : 'input';
    let newWText = this.state.wTokenTYpe === 'input' ? 'hide' : 'show'
    this.setState({
      wTokenType: newWtoken,
      wText: newWText
    })
  },
  render() {
    console.log(this.state);
    return (

      <div>
      
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
            <div className="input-group">
              <input type={this.state.pTokenType} className="form-control" id="page-token" ref="pageToken" value={this.state.pageToken} onChange={this.pageTokenChange}/>
              <span className="input-group-btn">
                <button className="btn btn-danger" onClick={this.changePTokenType}>{this.state.pText}</button>
              </span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="webhook-token">Facebook Webhook Token:</label>
            <div className="input-group">
              <input type={this.state.wTokenType} className="form-control" id="webhook-token" ref="webhookToken" value={this.state.webhookToken} onChange={this.webhookTokenChange} /> 
              <span className="input-group-btn">
                <button className="btn btn-danger" onClick={this.changeWTokenType}>{this.state.wText}</button>
              </span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="webhook-url">Facebook Webhook Url:</label><br/>
            <input className="form-control" type="text" readOnly value={this.state.webhookUrl} />
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