function layers(state=[], action){
  switch(action.type){
    case 'LOAD_NODES':
      var newState = [];
      action.nodes.forEach(node => {
        if(node.layer >= 2){
          if(!newState[node.layer-2]){
            newState[node.layer-2] = [node];
          }
          else{
            newState[node.layer-2].push(node);
          }
        }
      })
      return newState;
      break;

    case 'ADD_NODE':
      var newState = [...state];

      if(!newState[action.layer-2]){
        newState[action.layer-2] = [action.newNodeId];
      }
      else{
        newState[action.layer-2].push(action.newNodeId);
      }
      console.log(newState);
      return newState;

    default:
      return state;
      break;
  }

}

export default layers;


