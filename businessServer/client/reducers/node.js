function node(state=[], action){
  switch(action.type){
    case 'ADD_NODE':
      return [
        ...state,
        {id:action.newNodeId,
          layer: action.layer,
          topLevel: action.topLevel,
          productId: action.productId}
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
          topLevel: action.topLevel
        }
      ]


    default:
      return state;

  }
}

export default node;


