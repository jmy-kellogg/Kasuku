import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actions';
import Main from './Main';


function mapStateToProps(state) {
    return {
        connection: state.connection,
        node: state.node,
        product: state.product,
        business: state.business,
        layers: state.layers,
        selected: state.selected
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);

export default App;
