function node(state=[], action){
  switch(action.type){
    case 'REMOVE_LEAF_NODE':
      var newState = {...state};
      newState[action.nodeId].leafNode = false;
      return newState;
      break;
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
        newState[node.id].conns = [];
        action.connections.forEach(connection => {
          if(connection.fromId === node.id){
            newState[node.id].conns.push(connection.id);
          }
        })
      })
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
      return newState;
      break;

    case 'ADD_NODE':
      // find node that is connecting to the new node and change the leaf node value
      console.log(state);
      var newState = {...state};
      newState[action.newNodeId] = {
        id: action.newNodeId,
        layer: action.layer,
        topLevel: action.topLevel,
        productId: action.productId,
        conns: [],
        topLevelNodeIndex: action.topLevelNodeIndex,
        leafNode: action.leafNode
      }
      return newState;
      break;

    case 'SAVE_NODE':

      var newState = {...state};
      newState[action.thisNodeId].question = action.question;

      return newState;
      break;

    // case 'ADD_TOP_LAYER_NODE':
    //   var newState = {...state};
    //   newState[action.newNodeId] = {
    //       id:action.newNodeId,
    //       layer: action.layer,
    //       productId: action.productId,
    //       topLevel: action.topLevel,
    //       conns: [],
    //       topLevelNodeIndex: action.topLevelNodeIndex,
    //       leafNode: action.leafNode
    //   }
    //   return newState;
    //   break;

    default:
      return state;

  }
}

export default node;


