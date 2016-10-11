function node(state=[], action){
  switch(action.type){
    case 'ADD_ANSWER':
      var newState = [...state];
      newState.forEach(node => {
        if(node.id == action.fromId){
          if(!node.conns){
            node.conns = [];
          }
          node.conns.push(action.connId);
        }
      });
      return newState;
      break;
    case 'ADD_NODE':
      return [
        ...state,
        {
          id: action.newNodeId,
          layer: action.layer,
          topLevel: action.topLevel,
          productId: action.productId,
          conns: []
        }
      ]
      break;
    case 'SAVE_NODE':
      var newState = [...state];
      newState.forEach(node => {
        if(node.id == action.thisNodeId){
          node.question = action.question;
        }
      })
      return newState;
    case 'ADD_TOP_LAYER_NODE':
      return [
        ...state,
        {
          id:action.newNodeId,
          layer: action.layer,
          productId: action.productId,
          topLevel: action.topLevel,
          conns: []
        }
      ]


    default:
      return state;

  }
}

export default node;


