import {  createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware, syncHistoryWithStore} from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
// import the root reducer
import rootReducer from './reducers/index';

import node from './data/node';
import connection from './data/connection';
import product from './data/product';
import business from './data/business';

const middleware = applyMiddleware(thunk, routerMiddleware(browserHistory));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create an object for the default data
const defaultState = {

  node: [],
  connection: [],
  product: [],
  business: [],
  layers: [],
  selected: [],
  nodeIds: [],
  connIds: [],
  prodSelected: "undefined",
  headNode: 0

};

  // old configuration
 // const store = createStore(rootReducer, defaultState, middleware,
 //    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

 const store = createStore(rootReducer, defaultState, composeEnhancers(middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


  // const store = createStore(reducer, preloadedState, composeEnhancers(
  //   applyMiddleware(...middleware)
  // ));

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
