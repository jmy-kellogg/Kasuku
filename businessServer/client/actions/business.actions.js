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
          return {greeting: business.greeting, pageToken: business.pageToken }
        }
      })
      .then(function(infoForFB) {
        console.log(infoForFB)
        return fetch('https://graph.facebook.com/v2.6/me/thread_settings?access_token=' + infoForFB.pageToken, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            setting_type: "greeting",
            greeting: {
              text: infoForFB.greeting
            }
          })
        })

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


