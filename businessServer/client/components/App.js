import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actions';
import Main from './Main';
import SingleForm from './SingleForm';
import Product from './Product';

// console.log(actionCreators, "ACTIONCREATORS\n\n")

function mapStateToProps(state) {
	return {
		connection: state.connection,
		node: state.node,
    	product: state.product
	};
};

function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators, dispatch)
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
