function product(state=[], action){
  switch(action.type){
    case 'UPDATE_PRODUCT_TO':
      var newState = [...state];
      newState.forEach(product => {
        if(product.id === action.productId){
          product.toId = action.nodeId;
        }
      })
      return newState;
    case 'LOAD_PRODUCTS':
      var newState = [];
      action.products.forEach(product => {
        newState.push({
          id: product.id,
          name: product.answer
        })
      })
      console.log(newState);
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
