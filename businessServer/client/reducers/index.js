import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import node from './node';
import connection from './connection';
import product from './product';
import business from './business';
import signup from './signup';


const rootReducer = combineReducers({connection, node, product, business, signup, routing: routerReducer });


export default rootReducer;
