import { createStore, compse } from 'redux';
import { syncHistoryWithStore} from 'react-router-redux';
import { browserHistory } from 'react-router';

// import the root reducer
import rootReducer from './reducers/index';

import node from './data/node';
import connection from './data/connection';


// create an object for the default data
const defaultState = {
  node,
  connection
};

 const store = createStore(rootReducer, defaultState, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export const history = syncHistoryWithStore(browserHistory, store);

export default store;