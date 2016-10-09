function product(state=[], action){
  switch(action.type){
    case 'ADD_PRODUCT':
      return [
          ...state,
          {
            name: action.name,
            id: action.productId
          }
        ]
    default:
      return state;
  }
}

export default product
