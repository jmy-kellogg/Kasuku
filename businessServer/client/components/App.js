import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as singleFormActionCreators from '../actions/singleFormAction';
import Main from './Main';
import SingleForm from './SingleForm';


function mapStateToProps(state) {
	return {
		connection: state.connection,
		node: state.node
	};
};

function mapDispatchToProps(dispatch){
	return bindActionCreators(singleFormActionCreators, dispatch)
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;