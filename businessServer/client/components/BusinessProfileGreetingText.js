import React from 'react';

const BusinessProfileGreetingText = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    console.log("calling handleSubmit on greeting text")
  },

  render (){
    return (
      <div>
        <h1>Initial Greeting</h1>
        <form>
         <div className="form-group" onSubmit={this.handleSubmit}>
           <label htmlFor="greeting-text">Greeting Text</label>
           <input type="text" className="form-control" id="greeting-text" />
         </div>

         <button type="button" onClick={this.handleSubmit} className="btn btn-primary">Save</button>
         <button type="button" onClick={this.handleSubmit} className="btn btn-danger">Delete Greeting</button>
        </form>
      </div>
    )
  }
});

export default BusinessProfileGreetingText;

