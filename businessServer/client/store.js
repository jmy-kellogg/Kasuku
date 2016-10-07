import { applyMiddleware, createStore, compse } from 'redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
// import the root reducer
import rootReducer from './reducers/index';

import node from './data/node';
import connection from './data/connection';
import product from './data/product';
import business from './data/business';

const middleware = applyMiddleware(thunk);

// create an object for the default data
const defaultState = {
  node,
  connection,
  product,
  business
};

 const store = createStore(rootReducer, defaultState, middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
