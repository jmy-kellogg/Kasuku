 
  function updateQuestion(state=[], action) {
    console.log(action)
    switch(action.type){
      case 'UPDATE_QUESTION':
        return { question: action.question }
        break;
      default:
        return state;
    }
  }

export default updateQuestion
