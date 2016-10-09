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
import Tree from './components/Tree';
import Product from './components/Product';
import Layers from './components/Layers';
import businessProfilePage from './components/BusinessProfilePage';

//import react router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';


const router = (

	<Provider store={store}>
	  <Router history={ history}>
	    <Route path='/' component={App}>
			<IndexRoute component={Home} />
			<Route path='/form' component={SingleForm} />
			<Route path='/layers' component={Layers} />
	      	<Route path='/login' component={Login} />
	      	<Route path='/signup' component={Signup} />
	      	<Route path='/product' component={Product} />
	      	<Route path='/tree/:businessId' component={Tree} />
          <Route path='/businesses/:businessId' component={businessProfilePage} />
		  </Route>
	  </Router>
	</Provider>

)

render(router, document.getElementById('root'));
