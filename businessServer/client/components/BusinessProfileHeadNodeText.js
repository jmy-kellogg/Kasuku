import React from 'react';
import axios from 'axios';
import TooltipGlyph from './TooltipGlyph';

const BusinessProfileHeadNodeText = React.createClass({
  getInitialState () {
    return {
      greeting: '',
    }
  },
  handleSubmit () {
    axios.post(`/api/business/${this.props['data-id']}`)
  },
  render() {
    const FIRST_QUESTION_INFO = 'This will be the first message sent to a user. A good idea is to make this a question about your products.'
    return (
      <div className="business-first-question"> 
        <form>
          <div className="form-group" onSubmit={this.handleSubmit}>
            <label htmlFor="first-question">First Question:&nbsp;</label> <TooltipGlyph tip={FIRST_QUESTION_INFO}/>
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
})

export default BusinessProfileHeadNodeText