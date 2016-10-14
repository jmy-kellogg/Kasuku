function selected(state=[], action){
  switch(action.type){
    case 'LOAD_NODES':
      var newState = [];
      return newState;
    case 'CHANGE_SELECTED':
      var newState = [...state];
      var layer = action.layer - 1;
      newState[layer] = [];
      if(newState[layer]){
        newState[layer] = action.thisId;
      }
      else{
        newState[layer] = null;
      }

      for(var x = layer+1; x < newState.length; x++){
        newState[x] = null;
      }
      return newState;
      break;
    default:
      return state;
      break;
  }

}

export default selected;


