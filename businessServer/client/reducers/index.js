import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import node from './node';
import connection from './connection';

const rootReducer = combineReducers({connection, node, routing: routerReducer });

export default rootReducer;
