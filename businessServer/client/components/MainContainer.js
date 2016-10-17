import React from 'react';
import Product from './Product';
// import Layers from './Layers';
import Layer from './Layer';
import TopLayer from './topLayer';
import axios from 'axios';
import TestBox from './TestBox';
import Modal from './Modal';


const MainContainer = React.createClass({
  componentWillMount: function(){
    var _nodesIdArr = [];
    var _nodesArr = [];
    var _allConnections;
    var _products = [];
    var _productIds = [];
    var _topLevelNodes = {};

    if(this.props.params.businessId){
      axios.get(`/api/connections/?businessId=${this.props.params.businessId}`)
      .then(res => res.data)
      .then(connections => {
        _allConnections = connections;

        this.props.loadConnections(connections);

        _allConnections.forEach(conn => {
          if(conn.id === conn.productId){
            _products.push(conn);
            _productIds.push(conn.id);
          }
        })
        this.props.loadProducts(_products);

      })
      .then(data => {

        axios.get(`/api/nodes/`)
          .then(res => res.data)
          .then(nodes => {

            nodes.forEach(node => {
              if(_productIds.includes(+node.productId)){
                _nodesIdArr.push(node.id);
              }
            })

            _nodesIdArr.forEach(nodeId => {
              _nodesArr.push(getNodeById(nodeId, nodes))
            })
            // this.props.setHeadNode(headNodeId);

            _nodesArr.forEach(node => {
              if(node.topLevel){
                if(!_topLevelNodes[node.productId]){
                  _topLevelNodes[node.productId] = [];
                }
                  _topLevelNodes[node.productId].push(node);
              }
            })
            this.props.loadTopLevelNodes(_topLevelNodes);

            this.props.loadNodes(_nodesArr);

            this.props.loadNodeConnections(_nodesArr, _allConnections);

          })

        var getNodeById = function(id, nodes){
          var _node;
          nodes.forEach(node => {
            if(node.id == id){
              _node = node;
            }
          })
          return _node;
        }
      })
    }
  },

  render: function(){

    var layersHTML = [];

    var layersDiv = this.props.layers.map((layer, i) => {
      return (
        <div className="layerCol" key={i}>
          <Layer {...this.props} key={i} layer={i+2} data={layer} />
        </div>
      )
    })

// product    : layer 0  : undefined : undefined
// top layer  : layer 1  : undefined  : selected[0]
// all layers : layer 2+ : layer[0] : selected[1]

    return (
      <div className="chatbotPage">
        <Product {...this.props} layer={0}/>
        <TopLayer {...this.props} layer={1}/>
        <div id="extendConvo" className="extendConvo">
          {layersDiv}
        </div>
        <TestBox/>
      </div>

    )
  }
});

export default MainContainer
