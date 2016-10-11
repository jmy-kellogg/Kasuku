function connection(state=[], action){
  switch(action.type){
    case 'ADD_PRODUCT':

      var newState = {...state};
      newState[action.id] = {
        answer: action.name,
        id: action.id,
        fromId: action.fromId,
        businessId: action.businessId
      }

      return newState;
      // return {

        // {
        //   answer: action.name,
        //   id: action.id,
        //   fromId: action.fromId,
        //   businessId: action.businessId
        // }
      // }
      break;

    case 'ADD_ANSWER':
      var newState = {...state};
      newState[action.connId] = {
        answer: action.answer,
        id: action.connId,
        fromId: action.fromId,
        businessId: action.businessId
      }
      console.log(newState);
      return newState;
      // return {
      //   ...state,
      //   [action.connId]: {
      //     answer: action.answer,
      //     id: action.connId,
      //     fromId: action.fromId,
      //     businessId: action.businessId
      //   }

      // }
      // return [
      //   ...state,
      //   {
      //     answer: action.answer,
      //     id: action.connId,
      //     fromId: action.fromId,
      //     businessId: action.businessId
      //   }
      // ]
      break;
    case 'ADD_NODE':
      // var newState = [...state];
      var newState = {...state};
      newState[action.connId].toId = action.newNodeId;

      // var c;
      // newState.forEach(item => {
      //   if(item.id === action.connId){
      //     item.toId = action.newNodeId;
      //   }
      // })
      return newState;

      break;
    default:
      return state;
  }
}

export default connection
