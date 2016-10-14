function node(state=[], action){
  switch(action.type){
    case 'LOAD_NODES':
      var newState = {};
      action.nodes.forEach(node => {
        newState[node.id] = node;
      })
      return newState;
      break;
    case 'LOAD_NODE_CONNECTIONS':
      var newState = {...state};
      action.nodes.forEach(node => {
        action.connections.forEach(connection => {
          if(connection.fromId === node.id){
            if(!newState[node.id].conns){
              newState[node.id].conns = [];
            }
            newState[node.id].conns.push(connection.id);
          }
        })
      })
      console.log(newState);
      return newState;
      break;


    case 'REMOVE_NODES':
      var newState = {...state};
      action.nodes.forEach(nodeId => {
        delete newState[nodeId];
      })
      return newState;
      break;


    case 'ADD_ANSWER':
      var newState = {...state};
      if(!newState[action.fromId].conns){
        newState[action.fromId].conns = [];
      }
      newState[action.fromId].conns.push(action.connId);
      console.log(newState);
      return newState;
      break;

    case 'ADD_NODE':
      console.log(state);
      var newState = {...state};
      newState[action.newNodeId] = {
        id: action.newNodeId,
        layer: action.layer,
        topLevel: action.topLevel,
        productId: action.productId,
        conns: []
      }
      return newState;
      break;

    case 'SAVE_NODE':

      var newState = {...state};
      console.log(newState);
      newState[action.thisNodeId].question = action.question;

      return newState;
      break;

    case 'ADD_TOP_LAYER_NODE':
      var newState = {...state};
      newState[action.newNodeId] = {
          id:action.newNodeId,
          layer: action.layer,
          productId: action.productId,
          topLevel: action.topLevel,
          conns: []
      }
      return newState;
      break;

    default:
      return state;

  }
}

export default node;


