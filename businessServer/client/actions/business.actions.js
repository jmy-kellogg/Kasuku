import fetch from 'isomorphic-fetch';
import axios from 'axios';
import { browserHistory } from 'react-router';

function getData (res) { return res.data; };

export function updateBusinessProfile(id, businessName, email, pageToken, password, webhookToken) {
    return function (dispatch) {
      dispatch(updatingBusiness())
      console.log("Hi there")
      axios.put('/api/business/' + id, {
        businessName,
        email,
        pageToken,
        password,
        webhookToken
      })
      .then(getData)
      .then(function(business) {
        console.log("business", business);
        if (!business) {
          dispatch(errorUpdatingBusiness());
        } else {
          dispatch(successfullyUpdatedBusiness());
        }
      })
      .catch(function(err) {
        dispatch(errorUpdatingBusiness);
      })
    }
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

