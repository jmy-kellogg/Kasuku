function selected(state=[], action){
  switch(action.type){
    case 'CHANGE_SELECTED':
      var newState = [...state];
      var layer = action.layer - 2;
      newState[action.layer-2] = [];
      if(newState[action.layer-2]){
        newState[action.layer-2] = action.thisId;
      }
      else{
        newState[action.layer-2] = null;
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


