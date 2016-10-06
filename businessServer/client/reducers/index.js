import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import node from './node';
import connection from './connection';
import product from './product';
import signup from './signup';
console.log(signup, "SIGNUP");
const rootReducer = combineReducers({connection, node, product, signup, routing: routerReducer });

export default rootReducer;
