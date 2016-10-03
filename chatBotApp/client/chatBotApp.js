import React from 'react';

import { render } from 'react-dom';

// Import css
import css from './styles/style.css';

// Import Components
import Main from './components/Main';

//import react router deps
//import { Router, Route, IndexRoute, browserHistory } from 'react-router';
// import { Provider } from 'react-redux';
// import store, { history } from '.stores/store';


//const router = (

	// <Provider store={store}>
 //  <Router history={history}>
 //    <Route path="/" component={App}>
 //      <IndexRoute component={PhotoGrid}></IndexRoute>
 //      <Route path="/view/:postId" component={Single}></Route>
 //    </Route>
 //  </Router>
 //  </Provider>
//)

render(<Main/>, document.getElementById('root'));
