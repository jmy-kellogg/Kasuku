import React from 'react';
import SingleForm from './SingleForm';
import { Carousel } from 'react-bootstrap';

const TopLayer = React.createClass({

  render: function(){

    // const parentId = 1;

    // const connectionsArr = this.props.connection.filter(conn => {
    //   return conn.fromId === parentId;
    // }).map(conn => {
    //   return conn.toId
    // })
    // console.log('props nodes',this.props.node);
    // console.log('connections array', connectionsArr);

    // const nodesArr = this.props.node.filter(node => {
    //   return connectionsArr.includes(node.id);
    // })

    // call function to call action to make ajax request for all top layer nodes
    // but for the time being...
    const nodesArr = this.props.node.filter(node => {
      return node.productId === +this.props.params.productId;
    });
    const nodesDiv = nodesArr.map((node, i) => {
      return (
        <p>Question: {node.question}</p>
      )
    })
    const questionArr = nodesArr.map((node, i) => {
      return (
        <Carousel.Item key={i}>
          <SingleForm{...this.props} />
        <Carousel.Caption>
          <h3>Node</h3>
        </Carousel.Caption>
      </Carousel.Item>
      )
    })
    const carouselInstance = (
    <Carousel>
      {questionArr}
      <Carousel.Item>
        <img width={900} height={500} alt="900x500" src="/assets/carousel.png"/>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img width={900} height={500} alt="900x500" src="/assets/carousel.png"/>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );

    return (
        <div>
          {nodesDiv}
          <div className="layerBox">
            {carouselInstance}
          </div>
        </div>
      )
  }
});

export default TopLayer
