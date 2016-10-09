function connection(state=[], action){
  switch(action.type){
    case 'ADD_ANSWER':
      console.log(state);
      return [
        ...state,
        {
          answer: action.answer,
          id: action.id,
          fromId: action.fromId,
          businessId: action.businessId
        }
      ]
      break;
    case 'ADD_NODE':
      console.log(action);
      var newState = [...state];
      var c;
      newState.forEach(item => {
        if(item.id === action.connId){
          // console.log(item);
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
