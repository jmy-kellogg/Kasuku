function product(state=[], action){
  switch(action.type){
    case 'ADD_PRODUCT':
      return [
          ...state,
          {
            id: action.id
          }
        ]
      break;
    default:
      return state;
  }
}

export default product
