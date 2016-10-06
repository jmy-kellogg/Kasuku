function business(state=[], action){
  switch(action.type){
    case 'SET_BUSINESS':
        const newState = [
          ...state,
          {
    		businessName: action.businessName,
    		createdAt: action.createdAt,
    		headNodeId: action.headNodeId,
    		id: action.id,
    		updatedAt: action.updatedAt
          }
        ];
        return newState
    default:
      return state;
  }
}

export default business