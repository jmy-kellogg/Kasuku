import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';



const rootReducer = combineReducers({answer, routing: routerReducer });

export default rootReducer;
