import React from 'react';
import Layer from './Layer';
import TopLayer from './topLayer';
import ProductLayer from './productLayer';

const Layers = React.createClass({
  // iterate over array of arrays

  render: function(){
    console.log(this.props.layers);
    var layersDiv = this.props.layers.map((layer, i) => {
      console.log(layer);
      return (
        <span>
        layer {i+3}
        	<Layer {...this.props} key={i} i={i+3} data={layer} />
        }
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
