import React from 'react';
import Product from './Product';
// import Layers from './Layers';
import Layer from './Layer';


const MainContainer = React.createClass({

  render: function(){
    var layersDiv = this.props.layers.map((layer, i) => {
      return (
        <div className="layerCol" key={i}>
        {/*layer {i+3}*/}
          <Layer {...this.props} key={i} layer={i+2} data={layer} />
        </div>
      )
    })
    return (
      <div className="chatbotPage">
        <Product {...this.props} layer={0}/>
        <TopLayer {...this.props} layer={1}/>
        {layersDiv}
      </div>

    )
  }
});

export default MainContainer
