function layers(state=[], action){
  switch(action.type){
    case 'LOAD_NODES':
      var newState = [];
      // action.nodes.forEach(node => {
      //   if(node.layer >= 2){
      //     if(!newState[node.layer-2]){
      //       newState[node.layer-2] = [node];
      //     }
      //     else{
      //       newState[node.layer-2].push(node);
      //     }
      //   }
      // })
      return newState;
      break;
    case 'SET_SELECTED_PRODUCT':
      return [];
      break;
    case 'CHANGE_SELECTED':
    // connection selected
    // layer of parent node
    // nodes
      var newState = [];
      for(var y = 0; y < action.layer; y++){
        if(y === action.layer-1){
          for(var key in action.nodes){
            if(action.connection.toId === action.nodes[key].id){
              if(!newState[action.layer-1]){
                newState[action.layer-1] = [];
              }
              newState[action.layer-1].push(action.nodes[key].id);
            }
          }
        }
        else{
          newState[y] = [...state[y]];
        }
      }
      // console.log(action.nodes);
      // var newState = [...state];
      // for(var key in action.nodes){
      //   if(action.connection.toId === action.nodes[key].id){
      //     if(!newState[action.layer-1]){
      //       newState[action.layer-1] = [];
      //     }
      //     newState[action.layer-1].push(action.nodes[key].id);
      //   }
      // }
      // for(var x = action.layer; x < newState.length; x++){
      //   newState[x] = null;
      // }
      // remove all nodes from other layers

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


