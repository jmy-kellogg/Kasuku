import React from 'react';
import fetch from 'isomorphic-fetch';
import polyfill from 'es6-promise';


const Tree = React.createClass({
  render: function() {
    const properties = this.props;
    const businessId = properties.params.businessId;
    if(!this.props.business.length){
      fetch('../api/business/'+ businessId)
        .then(function(response){
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
        })
        .then(function(business){
          properties.setBusinessAction(business)   
        })
    }
    return (
      <div>
        <p>This is the {this.props.business[0].businessName} tree!</p>
      </div>
    )
  }
});

export default Tree;
