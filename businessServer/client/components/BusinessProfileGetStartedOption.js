import React from 'react';
import TooltipGlyph from './TooltipGlyph';
import fetch from 'isomorphic-fetch';
import axios from 'axios';

const BusinessProfileGetStartedOption = React.createClass({
  getInitialState() {
    return {
      isOn: true
    }
  },
  getStartedOn(e) {
    e.preventDefault();
    this.setState({isOn: true});
    this.addGetStarted();

  },
  getStartedOff(e) {
    e.preventDefault();
    this.setState({isOn: false});
    this.removeGetStarted();
  },

  removeGetStarted () {
    axios.get(`/api/business/${this.props["data-id"]}`)
    .then( (val) => {
     
      return fetch('https://graph.facebook.com/v2.6/me/thread_settings?access_token=' + val.data.pageToken, {
                method: 'DELETE',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  setting_type: "call_to_actions",
                  thread_state: "new_thread",
                })
      })
    })
    .then( (val) => { 
      console.log(val.status)
      return axios.put(`/api/business/${this.props["data-id"]}`, { getStartedButton: false })
      }
    )
    .then( (_business) => {
      this.setState({isOn: _business.data.getStartedButton})
      console.log(this.state, "THIS WAS MY STATE");
    })
  },
  addGetStarted () {
    axios.get(`/api/business/${this.props["data-id"]}`)
    .then( (val) => {
      this.setState({isOn: val.data.getStartedButton})
      console.log(this.state, "THIS WAS MY STATE");
      return fetch('https://graph.facebook.com/v2.6/me/thread_settings?access_token=' + val.data.pageToken, {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  setting_type: "call_to_actions",
                  thread_state: "new_thread",
                  call_to_actions:[
                    {payload: "START_AT_HEAD_NODE"}]
                })
            })
      
    })
    .then( (val) => { 
      console.log(val.status) 
      return axios.put(`/api/business/${this.props["data-id"]}`, { getStartedButton: true })
    })
    .then( (_business) => {
      this.setState({isOn: _business.data.getStartedButton})
      console.log(this.state, "THIS WAS MY STATE");
    })
  },

  render (){
    const GETSTARTEDTOOLTIP=`This adds a "get started button for the first time engages in a chat`
    console.log(this.state)
    return (
      <div>
        <form>
          <div>
          <label htmlFor="get-started-button">Include a "Get Started Button":&nbsp;</label><TooltipGlyph tip={GETSTARTEDTOOLTIP}/>
          </div>
          <div className="btn-group" data-toggle="buttons">
            <label onClick={this.getStartedOn} className={ this.state.isOn ? 'btn btn-submit active' : 'btn btn-submit'}>
              <input type="radio" name="enable-get-started" id="enable-get-started" autoComplete="off" defaultChecked /> Enable Get Started Button
              </label>
            <label onClick={this.getStartedOff} className={ !this.state.isOn ? 'btn btn-submit active' : 'btn btn-submit'}>
              <input  type="radio" name="disable-get-started" id="disable-get-started" autoComplete="off" /> Disable Get Started Button
            </label>
          </div>
          <h6>Currently you { this.state.isOn ? '' : 'do not'} have a "Get Started Button"</h6>
        </form>
      </div>
    )
  }
});

export default BusinessProfileGetStartedOption;



/*
RELEVANT FACEBOOK POST REQUESTS FOR ADD/DELETE OPTION

curl -X POST -H "Content-Type: application/json" -d '{
  "setting_type":"call_to_actions",
  "thread_state":"new_thread",
  "call_to_actions":[
    {
      "payload":"USER_DEFINED_PAYLOAD"
    }
  ]
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=PAGE_ACCESS_TOKEN"      
Fields

Property Name Description Required
setting_type
Must be call_to_actions
Y
thread_state
Must be new_thread
Y
call_to_actions
Array of payload strings
Y
call_to_actions is limited to 1
call_to_actions must contain at least one payload string. This data will be sent back to you via webhook.
Callback

A user tapping the Get Started button triggers the postback received callback.

Response

If the Get Started button was successfully set, you will get the following response:

{
  "result": "Successfully added new_thread's CTAs"
}    
Delete

In order to delete the Get Started button send a DELETE request:

curl -X DELETE -H "Content-Type: application/json" -d '{
  "setting_type":"call_to_actions",
  "thread_state":"new_thread"
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=PAGE_ACCESS_TOKEN"    

*/