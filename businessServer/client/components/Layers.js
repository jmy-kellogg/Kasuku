import React from 'react';
import Layer from './Layer';
import TopLayer from './topLayer';


const Layers = React.createClass({

  render: function(){
    const layersArr = [1];

    var layersDiv = layersArr.map((item, i) => {
      return (
              <span>
        <Layer {...this.props} key={i} i={i}/>
        </span>
      )
    })

    return (

      <div>
        <TopLayer {...this.props}/>
        {layersDiv}
      </div>
    )
  }
});

export default Layers
