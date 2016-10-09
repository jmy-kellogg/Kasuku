export function addTopLayerNodeAction(newNodeId, productId, layer){
  return {
    type: 'ADD_TOP_LAYER_NODE',
    newNodeId,
    layer,
    productId,
    topLevel: true
  }
}

export function addLayers(layer){
    return {
    type: 'ADD_NEW_LAYER',
    layer
    }
}

export function changeSelected(thisId, layer){
    console.log(thisId, layer);
    return {
        type: 'CHANGE_SELECTED',
        thisId,
        layer
    }
}

export function changeTopLevelQuestion(question, thisNodeId){
    return {
      type: 'SAVE_TOP_LEVEL_QUESTION',
      question,
      thisNodeId
    }
}
export function saveNode(question, thisNodeId){
  return {
    type: 'SAVE_NODE',
    question,
    thisNodeId
  }

}

export function addNewNode(connId, newNodeId, layer) {
    return {
        type: 'ADD_NODE',
        connId,
        newNodeId,
        layer
    }
}

export function addProductAction(name) {
    return {
        type: 'ADD_PRODUCT',
        name
    }
}

export function addAnswerAction(answer, fromId = null, businessId = null, id) {
    console.log(fromId);
    return {
        type: 'ADD_ANSWER',
        id,
        answer,
        fromId,
        businessId
    }
}

export function getNodesAction(id) {
    return {
        type: 'GET_NODE',
        id
    }
}

export function setBusinessAction(buisness) {
    return {
        type: 'SET_BUSINESS',
        businessName: buisness.businessName,
        createdAt: buisness.createdAt,
        headNodeId: buisness.headNodeId,
        id: buisness.id,
        updatedAt: buisness.updatedAt
    }
}
// export function requestNode(id) {
//   return {
//     type: 'REQUEST_NODE',
//     id
//   }
// }

// export function receiveNode(id, node) {
//   return {
//     type: "RECEIVE_NODE",
//     id,
//     node
//   }
// }

// signup user actions
// export function signup(username, email, password, password_confirmation) {
//   return {
//     type: "SIGNUP_USER",
//     username,
//     email,
//     password,
//     password_confirmation
