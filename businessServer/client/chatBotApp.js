import React from 'react';

import { render } from 'react-dom';

// Import css
import css from './styles/style.css';

// Import Components
import App from './components/App';
import SingleForm from './components/SingleForm';



//import react router deps
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';


const router = (

	<Provider store={store}>
	  <Router history={ history}>
	    <Route path="/" component={App}>
	    </Route>
	  </Router>
	</Provider>

)

render(router, document.getElementById('root'));
