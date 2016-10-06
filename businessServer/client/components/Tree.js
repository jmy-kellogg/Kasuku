import React from 'react';
import fetch from 'isomorphic-fetch';
import polyfill from 'es6-promise';


const Tree = React.createClass({
  render: function() {
    const businessId = this.props.params.businessId;
    const properties = this.props;
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
        <p>tree</p>
      </div>
    )
  }
});

export default Tree;
