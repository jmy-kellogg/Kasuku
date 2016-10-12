function layers(state=[], action){
  switch(action.type){
    case 'LOAD_NODES':
      var newState = [];
      action.nodes.forEach(node => {
        if(node.layer >= 3){
          if(!newState[node.layer-3]){
            newState[node.layer-3] = [node];
          }
          else{
            newState[node.layer-3].push(node);
          }
        }
      })
      return newState;
      break;

    case 'ADD_NODE':
      var newState = [...state];

      if(!newState[action.layer-3]){
        newState[action.layer-3] = [action.newNodeId];
      }
      else{
        newState[action.layer-3].push(action.newNodeId);
      }
      return newState;

    default:
      return state;
      break;
  }

}

export default layers;


