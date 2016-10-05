import React from 'react';

const Home = React.createClass({
	render: function (){
		return (
			<div>
			 {JSON.stringify(this.props.connection)}
			</div>
		)
	}
});

export default Home