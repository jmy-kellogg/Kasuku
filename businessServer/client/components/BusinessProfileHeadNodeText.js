import React from 'react';
import axios from 'axios';
import TooltipGlyph from './TooltipGlyph';
import Spinner from './Spinner';

const BusinessProfileHeadNodeText = React.createClass({
  getInitialState () {
    return {
      question: '',
      headNodeId: null,
      saveButtonText: 'Save',
      isSaving: false
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
    this.setState({isSaving: true, saveButtonText: "Saving..."})
    axios.put(`/api/nodes/${this.state.headNodeId}`, {
        question: this.state.question
    })
    .then( (node) => {
      setTimeout(() => {
        this.setState({question: node.data.question, isSaving: false, saveButtonText: "Save"})
      }, 500)
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
                <button onClick={this.handleSave} className="btn btn-submit"><span hidden={!this.state.isSaving}><Spinner size="15px"/></span>{this.state.saveButtonText}</button>
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