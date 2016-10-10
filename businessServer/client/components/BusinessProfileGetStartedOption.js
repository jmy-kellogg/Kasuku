import React from 'react';
import TooltipGlyph from './TooltipGlyph';

const BusinessProfileGetStartedOption = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    console.log("calling handleSubmit on greeting text")
  },

  render (){
    const GETSTARTEDTOOLTIP=`This adds a "get started button for the first time engages in a chat`
    return (
      <div>
        <h1>Get Started Option</h1><TooltipGlyph tip={GETSTARTEDTOOLTIP}/>
        <form>
         <div className="btn-group" data-toggle="buttons">
            <label className="btn btn-primary">
              <input type="radio" name="enable-get-started" id="enable-get-started" autoComplete="off" defaultChecked /> Enable Get Started Button
            </label>
            <label className="btn btn-primary">
              <input type="radio" name="disable-get-started" id="disable-get-started" autoComplete="off" /> Disable Get Started Button
            </label>
          </div>
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