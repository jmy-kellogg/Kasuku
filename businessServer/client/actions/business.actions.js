import fetch from 'isomorphic-fetch';
import axios from 'axios';
import { browserHistory } from 'react-router';

function getData (res) { return res.data; };

export function updateBusinessProfile(id, businessName, email, pageToken, password, webhookToken) {
    return function (dispatch) {
      dispatch(updatingBusiness())
      axios.put('/api/business/' + id, {
        businessName,
        email,
        pageToken,
        password,
        webhookToken
      })
      .then(getData)
      .then(function(business) {
        if (!business) {
          dispatch(errorUpdatingBusiness());
        } else {
          dispatch(successfullyUpdatedBusiness());
          browserHistory.push('/businesses/' + id)
        }
      })
      .catch(function(err) {
        dispatch(errorUpdatingBusiness);
      })
    }
}

export function saveGreeting(id, greeting) {
  return function (dispatch) {
    dispatch(updatingBusiness());
    axios.put('/api/business/' + id, {
      greeting
    })
    .then(getData)
    .then(function (business) {
      if (!business) {
          dispatch(errorUpdatingBusiness());
        } else {
          dispatch(successfullyUpdatedBusiness());
          return business.greeting
        }
      })
      .then(function (greeting) {
        console.log("THIS IS THE GREETING", greeting)
      })
      .catch(function(err) {
        dispatch(errorUpdatingBusiness);
      })
  }
}

export function deleteGreeting(id) {


}

function updatingBusiness() {
  return {
    type: "UPDATING_USER",
    posting: true
  }
}

function successfullyUpdatedBusiness() {
  return {
    type: "SUCCESSFULLY_UPDATED_BUSINESS",
    posting: false
  }
}

function errorUpdatingBusiness() {
  return {
    type: "ERROR_UPDATING_BUSINESS",
    posting: false
  }
}


