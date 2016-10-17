import React from 'react';

const Home = React.createClass({

    render: function() {
        return (
        	<div className="homePage">
        		<img className="homeImg" src={require('./images/kasuku.jpg')}/>
            </div>
            )
    }
});

export default Home
