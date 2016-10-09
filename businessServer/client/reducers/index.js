import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import node from './node';
import connection from './connection';
import product from './product';
import business from './business';
import signup from './signup';
import layers from './layers';
import selected from './selected';
import nodeIds from './nodeIds';


const rootReducer = combineReducers({connection, nodeIds, selected, layers, node, product, business, signup, routing: routerReducer });


export default rootReducer;
