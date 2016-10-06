import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import node from './node';
import connection from './connection';
import product from './product';

const rootReducer = combineReducers({connection, node, product, routing: routerReducer });

export default rootReducer;
