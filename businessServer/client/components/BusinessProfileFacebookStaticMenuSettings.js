import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import axios from 'axios';
import TooltipGlyph from './TooltipGlyph';

const BusinessProfileFacebookStaticMenuSettings = React.createClass({
  getInitialState() {
    return {
      isOn: true,
      menuSettingsArray: []
    }
  },
  componentDidMount() {
    axios.get('/api/menuSettings/' + this.props["data-id"])
    .then( (res) => res.data )
    .then( (_settings) => {
      this.setState({ menuSettingsArray: _settings })
    })
  },
  deleteMenuItem (index) {
    let newMenuSettingsArray = [
      ...this.state.menuSettingsArray.slice(0,index),
      ...this.state.menuSettingsArray.slice(index+1)
      ]
    this.setState( {menuSettingsArray: newMenuSettingsArray} );
  },
  typeOnChange (index, e) {
    let newMenuSettingsArray = [...this.state.menuSettingsArray];
    newMenuSettingsArray[index].type = e.target.value;
    this.setState( { menuSettingsArray: newMenuSettingsArray });
  },
  menuTextOnChange (index, e) {
    let newMenuSettingsArray = [...this.state.menuSettingsArray];
    newMenuSettingsArray[index].menuText = e.target.value;
    this.setState( { menuSettingsArray: newMenuSettingsArray });
  },
  webUrlOnChange (index, e) {
    let newMenuSettingsArray = [...this.state.menuSettingsArray];
    newMenuSettingsArray[index].webUrl = e.target.value;
    this.setState( { menuSettingsArray: newMenuSettingsArray });
  },
  addItem () {
    if (this.state.menuSettingsArray.length < 5) {
      let newMenuSettingsArray = this.state.menuSettingsArray;
      newMenuSettingsArray.push({type: 'webUrl', menuText: '', webUrl: ''})
      this.setState( { menuSettingsArray: newMenuSettingsArray });
    }
  },
  renderSettings(settings, index) {
    return (
      <div key={index}>
        <div id="first-menu-item">
          <div className="form-group">
            <label htmlFor="sel1">Select list:</label>
            <select className="form-control" id="sel1" ref="first-menu-type" defaultValue={settings.type} onChange={this.typeOnChange.bind(this, index)}>
              <option value="webUrl">Web Link</option>
              <option value="newOrder">New Order</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="first-menu-text">Menu Text</label><TooltipGlyph tip="CHANGE THIS" />
            <input type="text" className="form-control" id="first-menu-text" ref="first-menu-text" value={settings.menuText} onChange={this.menuTextOnChange.bind(this, index)} />
          </div>

          <div className="form-group">
            <label htmlFor="first-weburl">Web Link</label><TooltipGlyph tip="SOME STUFF" />
            <input type="text" className="form-control" id="first-weburl" ref="first-weburl" value={settings.webUrl} onChange={this.webUrlOnChange.bind(this, index)} />
          </div>
        </div>
        <button className="btn btn-danger" onClick={this.deleteMenuItem.bind(null, index)}>x</button>
      </div>
    )
  },
  onSubmitSettings() {
    // console.log("SUBMITTING");
    axios.post('/api/menuSettings/' + this.props["data-id"], { menuSettingsArray: this.state.menuSettingsArray })
    .then((newMenuSettingsArray) => {
      this.setState( { menuSettingsArray: newMenuSettingsArray.data });
    })
  },
  render () {

    const MENUTYPETIP = `You can choose to have the menu item link to a url (weblink) or for a customer to start a new order`;
    const MENUTEXTTIP = `This is the text that will be displayed on the menu (30 character limit)`;
    const WEBLINKTIP = `This is the link that you will send users to if they click on this menu item`;
    return (
      <div>
        <h1>Persistent Menu for Facebook</h1>
        {this.state.menuSettingsArray.map(this.renderSettings)}
        <button className="btn btn-success" onClick={this.addItem}>Add Menu Item</button>
        <button className="btn btn-primary" onClick={this.onSubmitSettings}>Save Menu Settings</button>
      </div>
    )
  }
})

export default BusinessProfileFacebookStaticMenuSettings
/* https://developers.facebook.com/docs/messenger-platform/thread-settings/persistent-menu */
// above url is for facebook info on persistent menus

function createOption(menuType, menuText, webUrl) {
  if (menuType === 'disabled') return null;
  let option = {
    menuType,
    menuText,
    webUrl
  }
  if (menuType !== 'webUrl') delete option.webUrl;
  return option;
}