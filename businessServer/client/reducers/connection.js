function connection(state=[], action){
  switch(action.type){
    case 'ADD_ANSWER':
      return [
        ...state,
        {
          answer: action.answer,
          id: action.connId,
          fromId: action.fromId,
          businessId: action.businessId
        }
      ]
      break;
    case 'ADD_NODE':
      var newState = [...state];
      var c;
      newState.forEach(item => {
        if(item.id === action.connId){
          item.toId = action.newNodeId;
        }
      })
      return newState;

      break;
    default:
      return state;
  }
}

export default connection
