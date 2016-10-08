import React from 'react';
import Layer from './Layer';
import TopLayer from './topLayer';
import ProductLayer from './productLayer';


const Layers = React.createClass({

  render: function(){
    const layersArr = [1];

    var layersDiv = layersArr.map((item, i) => {
      return (
        <span>
        	<Layer {...this.props} key={i} i={i+3}/>
        </span>
      )
    })

    return (
      <div>
        <ProductLayer {...this.props} i={1}/>
        <TopLayer {...this.props} i={2}/>
        {layersDiv}
      </div>
    )
  }
});

export default Layers
