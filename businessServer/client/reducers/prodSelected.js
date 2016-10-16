function prodSelected(state=-1, action){
  switch(action.type){
    case 'LOAD_CONNECTIONS':
      // maybe remove this case

      return state;
      break;
    case 'SET_SELECTED_PRODUCT':
        return action.productId;
        break;
    default:
      return state;
  }
}

export default prodSelected
