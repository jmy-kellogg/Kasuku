import React from 'react';


const PwordField = React.createClass({
  getInitialState() {
    return {
      ...this.state,
      type: 'input'
    }
  },
  componentDidMount () {
    this.setState({
      passwordValue: this.props.passwordValue
    })
  },

  showHide(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === 'input' ? 'password' : 'input'
    })
  },

  changePassword (e) {
    this.setState({
      passwordValue: e.target.value
    })
  },

  render() {
    return (
      <div>
        <input type={this.state.type} value={this.state.passwordValue} onChange={this.changePassword} />
        <span className="password__show" onClick={this.showHide}>{this.state.type === 'input' ? 'Hide' : 'Show'}</span>
      </div>
    )
  }
})

export default PwordField;