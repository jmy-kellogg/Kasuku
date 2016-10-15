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
import connIds from './connIds';
import prodSelected from './prodSelected';
import headNode from './headNode';
import updateQuestion from './updateQuestion';
import topLevelNodes from './topLevelNodes';

const rootReducer = combineReducers({connection, topLevelNodes, headNode, prodSelected, nodeIds, connIds, selected, layers, node, product, business, signup, updateQuestion, routing: routerReducer });


export default rootReducer;
