function prodSelected(state=[], action){
  switch(action.type){
    case 'LOAD_CONNECTIONS':
      return action.connections[0];
      break;
    case 'SET_SELECTED':
        return action.productId;
        break;
    default:
      return state;
  }
}

export default prodSelected
