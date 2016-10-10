function layers(state=[], action){
  switch(action.type){
    case 'ADD_NODE':
      var newState = [...state];
      console.log(action.layer, typeof action.layer)
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


