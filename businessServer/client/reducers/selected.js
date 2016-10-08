function selected(state=[], action){
  switch(action.type){
    case 'CHANGE_SELECTED':
      var newState = [...state];
      if(newState[+action.layer-2]){
        newState[+action.layer-2] = action.thisId;
      }
      else{
        console.log(newState[+action.layer-2]);
      }

      return newState;
      break;
    default:
      return state;
      break;
  }

}

export default selected;


