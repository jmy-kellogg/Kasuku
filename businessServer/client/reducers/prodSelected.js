function prodSelected(state=[], action){
  switch(action.type){
    case 'LOAD_CONNECTIONS':
      if(action.connections.length > 0)
      {
        return action.connections[0];
      }
      else{
        return state;
      }
      break;
    case 'SET_SELECTED_PRODUCT':
        return action.productId;
        break;
    default:
      return state;
  }
}

export default prodSelected
