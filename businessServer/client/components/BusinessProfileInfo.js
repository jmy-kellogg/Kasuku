import React from 'react'

const BusinessProfileInfo = React.createClass({
  handleSubmit (e) {
    e.preventDefault();
    console.log("handle submit for business profile info")
  },
  render() {
    return (
      <div>
      <h1>Business Info</h1>
        <form>
         
         <div className="form-group" onSubmit={this.handleSubmit}>
           <label htmlFor="business-name">Business Name:</label>
           <input type="text" className="form-control" id="business-name" />
         </div>

         <div className="form-group">
           <label htmlFor="email">Email address:</label>
           <input type="email" className="form-control" id="email" />
         </div>

         <div className="form-group">
           <label htmlFor="page-token">Facebook Page Token:</label>
           <input type="text" className="form-control" id="page-token" />
         </div>

         <div className="form-group">
           <label htmlFor="webhook-token">Facebook Webhook Token:</label>
           <input type="text" className="form-control" id="webhook-token" />
         </div>

         <div className="form-group">
           <label htmlFor="webhook-url">Facebook Webhook Url:</label>
         </div>

         <div className="form-group">
           <label htmlFor="pwd">Password:</label>
           <input type="password" className="form-control" id="pwd" />
         </div>


         <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Update</button>
       </form>
      </div>
    ) 
  }
})

export default BusinessProfileInfo