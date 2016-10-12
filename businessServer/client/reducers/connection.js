function connection(state=[], action){
  switch(action.type){

    case 'REMOVE_CONNECTIONS':
      var newState = {...state}
      action.connections.forEach(connId => {
        delete newState[connId];
      })
      return newState;
      break;

    case 'ADD_PRODUCT':

      var newState = {...state};
      newState[action.id] = {
        answer: action.name,
        id: action.id,
        fromId: action.fromId,
        businessId: action.businessId,
        price: action.price,
        description: action.description
      }

      return newState;
      break;

    case 'ADD_ANSWER':
      var newState = {...state};
      newState[action.connId] = {
        answer: action.answer,
        id: action.connId,
        fromId: action.fromId,
        businessId: action.businessId,
        price: action.price,
        description: action.description
      }
      return newState;
      break;

    case 'ADD_NODE':
      // var newState = [...state];
      if(action.connId){
        var newState = {...state};
        newState[action.connId].toId = action.newNodeId;
        return newState;
      }
      else{
        return state;
      }

      break;
    default:
      return state;
  }
}

export default connection
