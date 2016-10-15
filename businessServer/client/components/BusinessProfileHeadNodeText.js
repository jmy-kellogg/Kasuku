import React from 'react';
import axios from 'axios';
import TooltipGlyph from './TooltipGlyph';

const BusinessProfileHeadNodeText = React.createClass({
  getInitialState () {
    return {
      question: '',
      headNodeId: null
    }
  },
  componentDidMount () {
    axios.get(`/api/business/${this.props['data-id']}`)
    .then( (_business) => {
      return axios.get(`/api/nodes/${_business.data.headNodeId}`)
    })
    .then( (node) => {
      this.setState( { question: node.data.question,
                        headNodeId: node.data.id })
    })
  },
  questionChange (e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ question: e.target.value })
  },
  handleSave (e) {
    e.preventDefault();
    e.stopPropagation();
    axios.put(`/api/nodes/${this.state.headNodeId}`, {
        question: this.state.question
    })
    .then( (node) => {
      this.setState({question: node.data.question})
    })
  },
  render() {
    const FIRST_QUESTION_INFO = 'This will be the first message sent to a user. A good idea is to make this a question about your products.'
    return (
      <div className="business-first-question"> 
        <form>
          <div className="form-group" >
            <label htmlFor="first-question">First Question:&nbsp;</label> <TooltipGlyph tip={FIRST_QUESTION_INFO}/>
            <div className="input-group">
              <input type="text" className="form-control" id="greeting-text" value={this.state.question} onChange={this.questionChange} />
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