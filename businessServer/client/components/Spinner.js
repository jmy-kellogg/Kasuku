import React from 'react';
import RingLoader from 'halogen/RingLoader';

const Spinner = React.createClass({
  render() {
    let thisSize = this.props.size || '16px'
    return (
      <RingLoader className="pull-inline" hidden={this.props.hide} color="green" size={thisSize} />
    )
  }
})

export default Spinner;

