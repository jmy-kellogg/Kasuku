
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
