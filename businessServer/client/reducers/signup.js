function signup(state=[], action) {
  if (action.type === 'SIGNUP_USER'){
    return {
      [action.username]: action
    }
  }

  return state;
}

export default signup;