import React from 'react';

import { render } from 'react-dom';

// Import css
import css from './styles/style.css';

// Import Components
import Login from './components/Login';
import Signup from './components/Signup';
import App from './components/App';
import SingleForm from './components/SingleForm';
import Home from './components/Home';
import Product from './components/Product';
import Layers from './components/Layers';


//import react router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';


const router = (

	<Provider store={store}>
	  <Router history={ history}>
	    <Route path="/" component={App}>
				<IndexRoute component={Home} />
				<Route path="form" component={SingleForm} />
				<Route path="/Layers" component={Layers} />
	      <Route path='/Login' component={Login} />
	      <Route path='/Signup' component={Signup} />
	      <Route path='/Product' component={Product} />
		  </Route>
	  </Router>
	</Provider>

)

render(router, document.getElementById('root'));
