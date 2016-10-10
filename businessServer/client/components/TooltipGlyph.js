import React from 'react';
import Tooltip from 'rc-tooltip';
// var ReactDOM = require('react-dom')

const TooltipGlyph = React.createClass({
  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip()
  },
  render() {
    return (
      <span 
        type="button" 
        className="glyphicon glyphicon-question-sign" 
        data-toggle="tooltip" 
        data-placement="top" 
        title={this.props.tip}>
      </span>
    )
  }
});

export default TooltipGlyph;