// import store from '../store'
import fetch from 'isomorphic-fetch';
import axios from 'axios';

function getData (res) { return res.data; };


export function signup(username, email, password, password_confirmation) {
  console.log("HELLOW", username, email, password, password_confirmation)
  
  return function (dispatch) {
    console.log("Inside dispatch")
    dispatch(postingUser())
    axios.post('/api/business/', {
          username,
          email,
          password,
          password_confirmation
      })
      .then(getData)
      .then(function(user) {
        if (!user.username === username) {
          console.log('no user found');
          dispatch(errorSigningUp())
        } else {
          console.log('found a user', user.data)
          dispatch(signedup(user))
        }
      })
      .catch(function(user) {
        dispatch(errorSigningUp());
      })


  }
  
}


// signup action returns function with dispatch as argument

export function postingUser() {
  console.log("calling postingUser");
  return {
    type: "POSTING_USER",
    posting: true
  }
}


export function signedup(user) {
  console.log("calling signed up user", user)
  return {
    type: "SIGNEDUP_USER",
    posting: false,
    user
  }
}

export function errorSigningUp() {
  console.log("calling error signing up");
  return {
    type: "SIGNUP_ERROR",
    posting: false,
    user: null
  }
}