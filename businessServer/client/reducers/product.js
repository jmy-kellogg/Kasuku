function product(state=[], action){
  switch(action.type){
    case 'ADD_PRODUCT':
      console.log('add product', state);
      return [
          ...state,
          {
            name: action.name
          }
        ]
    default:
      return state;
  }
}

export default product
