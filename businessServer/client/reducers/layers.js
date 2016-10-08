function layers(state=[], action){
  switch(action.type){
    case 'ADD_NEW_LAYER':
      return state;
      break;
    case 'ADD_NODE':
      var newState = [...state];
      if(!newState[action.layer-3]){
        newState[action.layer-3] = [action.newNodeId];
      }
      else{
        newState[action.layer-3].push(action.newNodeId);
      }
      return newState;
    default:
      return state;
      break;
  }

}

export default layers;


