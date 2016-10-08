function node(state=[], action){
  switch(action.type){
    case 'ADD_NODE':
      console.log(state);
      return [
        ...state,
        {id:action.newNodeId}
      ]
      break;
    case 'SAVE_NODE':
      var newState = [...state];
      newState.forEach(node => {
        if(node.id == action.thisNodeId){
          node.question = action.question;
          console.log(node);
          console.log(action);
        }
      })
      return newState;
    case 'ADD_TOP_LAYER_NODE':
      return [
        ...state,
        {
          id:action.id,
          topLevel: action.topLevel
        }
      ]


    default:
      return state;

  }
}

export default node;


