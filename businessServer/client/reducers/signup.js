function signup(state=[], action) {
  console.log("Before if")
  if (action.type === 'SIGNUP_USER'){
    console.log("Inside if");
    return {
      [action.username]: action
    }
  }

  return state;
}

export default signup;