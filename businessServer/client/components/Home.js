import React from 'react';

const Home = React.createClass({

    render: function() {
        return ( 
        	< div > 
        		<div>
        			< img className="homeGif" src='https://cdn1.tnwcdn.com/wp-content/blogs.dir/1/files/2016/04/messenger-platform.gif'/>
        		</div>
        		<div>
        			<div className='imgCol'>
        				<img src='https://pressdispensary.co.uk/q991744/images/aco_bot.jpg'/>
        			</div>
        			<div className='textCol'> 
        				<div className="quote">
        				  <p>We are here for you to make your very own chatbot</p>
  						<div className="pointerLeft"></div>
        			</div>
        			</div>
        		</div>
        	< /div>)
    }
});

export default Home
