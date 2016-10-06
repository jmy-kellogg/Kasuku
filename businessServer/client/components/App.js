import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as singleFormActionCreator from '../actions/SingleFormAction';
import * as treeActionCreator from '../actions/treeAction';
import Main from './Main';
import SingleForm from './SingleForm';

const actionCreators = Object.assign({}, singleFormActionCreator, treeActionCreator);

function mapStateToProps(state) {
	return {
		connection: state.connection,
		node: state.node
	};
};

function mapDispatchToProps(dispatch){
	return bindActionCreators(actionCreators, dispatch)
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;