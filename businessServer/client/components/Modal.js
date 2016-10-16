import React from 'react';
import TestBox from './TestBox';

class Modal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      modalOpened: false
    }

    this.modalToggle = this.modalToggle.bind(this)
  }

  modalToggle () {
    this.setState({ modalOpened: !this.state.modalOpened })
  }

  render () {
    const coverClass = this.state.modalOpened ? 'modal-cover modal-cover-active' : 'modal-cover'
    const containerClass = this.state.modalOpened ? 'modal-container modal-container-active' : 'modal-container'
    return (
      <div>
        <div className='btn btn-primary' onClick={this.modalToggle}>Test</div>

        <div className={containerClass}>
          <TestBox/>
        </div>

        <div className={coverClass} onClick={this.modalToggle}></div>
      </div>
    )
  }
}
module.exports = Modal
// ReactDOM.render(<App />, document.getElementById('app'))
