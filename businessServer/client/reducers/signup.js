function signup(state=[], action) {
  console.log('signup reducer');
  if (action.type === 'SIGNUP_USER'){
    return {
      ...state,
      action
    }
  }

  return state;
}

export default signup;