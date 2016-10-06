function connection(state=[], action){
  switch(action.type){
    case 'ADD_ANSWER':
      console.log(state);
      break;
    default:
      return state;
  }
}

export default connection
