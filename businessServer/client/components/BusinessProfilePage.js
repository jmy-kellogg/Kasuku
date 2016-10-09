import React, { Component } from 'react';
import { render } from 'react-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import BusinessProfileInfo from './BusinessProfileInfo';
import BusinessProfileGreetingText from './BusinessProfileGreetingText';
import BusinessProfileGetStartedOption from './BusinessProfileGetStartedOption';
import BusinessProfileFacebookStaticMenuSettings from './BusinessProfileFacebookStaticMenuSettings';


const BusinessProfilePage = React.createClass({
  handleSelect(index, last) {
    //console.log('Selected tab: ' + index + ', Last tab: ' + last);
  },
  render () {
    return (
      <div>
        <Tabs onSelect={this.handleSelect}>
          <TabList>
            <Tab>Business Profile</Tab>
            <Tab>Business Greeting</Tab>
            <Tab>Persistent Menu Settings</Tab>
          </TabList>
          <TabPanel>
            <BusinessProfileInfo />
          </TabPanel>
          <TabPanel>
            <BusinessProfileGreetingText />
            <BusinessProfileGetStartedOption />
          </TabPanel>
          <TabPanel>
            <BusinessProfileFacebookStaticMenuSettings />
          </TabPanel>
        </Tabs>
      </div>
    )
  }



})

export default BusinessProfilePage;

/*
RELEVANT FACEBOOK POST REQUESTS FOR ADDING AND REMOVING

curl -X POST -H "Content-Type: application/json" -d '{
  "setting_type":"greeting",
  "greeting":{
    "text":"Timeless apparel for the masses."
  }
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=PAGE_ACCESS_TOKEN"    
Removing

curl -X DELETE -H "Content-Type: application/json" -d '{
  "setting_type":"greeting"
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=PAGE_ACCESS_TOKEN"   
    
Fields

Property Name Description Required
setting_type
Must be greeting
Y
greeting.text
Greeting text
Y
greeting.text must be UTF-8 and has a 160 character limit

*/