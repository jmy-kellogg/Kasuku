import React from 'react';
import fetch from 'isomorphic-fetch';
import polyfill from 'es6-promise';


const Tree = React.createClass({

  render: function() {
    const businessId = +this.props.params.businessId;
    const headNode = null;
      fetch('../api/business/1')
      .then(function(response){
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(business){
          console.log(business.headNodeId)
         
      })
    return (
      <div>

      </div>
    )
  }
});

export default Tree;
