function topLevelNodes(state=[], action){
  switch(action.type){
    // object where the key is the product id that holds an array of all node ids that are associated with that product
    case 'ADD_NODE':
      var newState = {...state};
      if(action.topLevel){
        newState[node.productId].push(node.id);
      }
      return newState;
    case 'LOAD_TOP_LEVEL_NODES':
      return action.topLevelNodes
    default:
      return state;
  }
}

export default topLevelNodes
