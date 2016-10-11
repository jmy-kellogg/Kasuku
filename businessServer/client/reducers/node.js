function node(state=[], action){
  switch(action.type){
    case 'ADD_ANSWER':
      var newState = {...state};
      if(!newState[action.fromId].conns){
        newState[action.fromId].conns = [];
      }
      newState[action.fromId].conns.push(action.connId);
      console.log(newState);
      return newState;

      // var newState = [...state];
      // newState.forEach(node => {
      //   if(node.id == action.fromId){
      //     if(!node.conns){
      //       node.conns = [];
      //     }
      //     node.conns.push(action.connId);
      //   }
      // });
      // return newState;
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
      // return {
      //   ...state,
      //   [action.newNodeId]: {
      //     id: action.newNodeId,
      //     layer: action.layer,
      //     topLevel: action.topLevel,
      //     productId: action.productId,
      //     conns: []
      //   }
      // }
      // return [
      //   ...state,
      //   {
      //     id: action.newNodeId,
      //     layer: action.layer,
      //     topLevel: action.topLevel,
      //     productId: action.productId,
      //     conns: []
      //   }
      // ]
      break;
    case 'SAVE_NODE':

      var newState = {...state};
      console.log(newState);
      newState[action.thisNodeId].question = action.question;

      // newState.forEach(node => {
      //   if(node.id == action.thisNodeId){
      //     node.question = action.question;
      //   }
      // })
      return newState;
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
      // return {
      //   ...state,
      //   [action.newNodeId]: {
      //     id:action.newNodeId,
      //     layer: action.layer,
      //     productId: action.productId,
      //     topLevel: action.topLevel,
      //     conns: []
      //   }
      // }
      // return [
      //   ...state,
      //   {
      //     id:action.newNodeId,
      //     layer: action.layer,
      //     productId: action.productId,
      //     topLevel: action.topLevel,
      //     conns: []
      //   }
      // ]


    default:
      return state;

  }
}

export default node;


