function prodSelected(state=[], action){
  switch(action.type){
    case 'SET_SELECTED':
        return action.product;
        break;
    default:
      return state;
  }
}

export default prodSelected
