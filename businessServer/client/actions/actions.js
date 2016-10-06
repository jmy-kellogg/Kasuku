
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