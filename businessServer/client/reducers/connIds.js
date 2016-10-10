function nodeIds(state=[], action) {
  switch(action.type){
    case 'ADD_ANSWER':
      return [
        ...state,
        action.connId
      ]
      break;
    default:
      return state;
  }
}

export default nodeIds;
