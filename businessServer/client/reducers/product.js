function product(state=[], action){
  switch(action.type){
    case 'LOAD_PRODUCTS':
      var newState = [];
      action.products.forEach(product => {
        newState.push({
          id: product.id,
          name: product.answer
        })
      })
      console.log(action.products);
      return newState;
      break;
    case 'ADD_PRODUCT':
      return [
          ...state,
          {
            id: action.id,
            name: action.answer
          }
        ]
      break;
    default:
      return state;
  }
}

export default product
