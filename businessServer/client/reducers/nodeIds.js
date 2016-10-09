function nodeIds(state=[], action) {
  switch(action.type){
    case 'ADD_NODE':
      return [
        ...state,
        action.newNodeId
      ]
      break;
    case 'ADD_TOP_LAYER_NODE':
      return [
        ...state,
        action.newNodeId
      ]
    default:
      return state;
  }
}

export default nodeIds;
