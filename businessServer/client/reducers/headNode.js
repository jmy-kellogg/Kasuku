function headNode(state=[], action){
  switch(action.type){
    case 'SET_HEADNODE':
        return action.nodeId;
        break;
    default:
      return state;
  }
}

export default headNode
