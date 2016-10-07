export function incIndex(id){
  // console.log(state);
  return {
    type: 'INC_NODE_INDEX'
  }
}
export function saveNode(question, thisNodeId){
  return {
    type: 'SAVE_NODE',
    question,
    thisNodeId
  }

}

export function addNewNode(connId, newNodeId){
  return {
    type: 'ADD_NODE',
    connId,
    newNodeId
  }
}

export function addProductAction(name){
  // console.log('inside the product action');
  // console.log(name);
  return {
    type: 'ADD_PRODUCT',
    name
  }
}


export function addAnswerAction(answer, fromId=null, businessId=null, id){
  console.log(fromId);
  return {
    type: 'ADD_ANSWER',
    id,
    answer,
    fromId,
    businessId
  }
}

export function getNodesAction(id){
  return {
    type: 'GET_NODE',
    id
  }
}

export function setBusinessAction(buisness){
  return{
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
export function signup(username, email, password, password_confirmation) {
  return {
    type: "SIGNUP_USER",
    username,
    email,
    password,
    password_confirmation

  }
}
