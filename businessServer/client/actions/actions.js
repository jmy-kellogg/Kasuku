
export function addProductAction(name){
  // console.log('inside the product action');
  // console.log(name);
  return {
    type: 'ADD_PRODUCT',
    name
  }
}


export function addAnswerAction(answer, fromId=null){

  return {
    type: 'ADD_ANSWER',
    answer,
    fromId,
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
// export function signup(username, email, password, password_confirmation) {
//   return {
//     type: "SIGNUP_USER",
//     username,
//     email,
//     password,
//     password_confirmation

//   }
// }