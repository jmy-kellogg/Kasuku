function signup(state=[{
  business: null,
  posting: false,
  }], action) {
  // console.log('signup reducer');
  switch (action.type) {
    case 'SIGNUP_USER': {
      return [
        ...state
      ]
    }
    case 'POSTING_USER': {
      console.log(action)
      return [
        ...state,
        {
          posting: action.posting
        }
      ]
    }
    case 'SIGNEDUP_USER': {
      console.log(action)
      return [
        ...state,
        {
          posting: action.posting,
          business: action.user
        }
      ]
      break;
    }
    case 'SIGNUP_ERROR' : {
      console.log(action)
      return [
        ...state,
        {
          posting: action.posting 
        }
      ]
    }
    default: {
      return state
    }
  }
  return state;
}

export default signup;