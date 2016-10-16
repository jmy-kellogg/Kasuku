import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import axios from 'axios';
import TooltipGlyph from './TooltipGlyph';
import Spinner from './Spinner';

const BusinessProfileFacebookStaticMenuSettings = React.createClass({
  getInitialState() {
    return {
      isOn: true,
      menuSettingsArray: [],
      isWeblink: true,
      saveButtonText: 'Save Menu Settings',
      isSaving: false
    }
  },
  componentDidMount() {
    axios.get('/api/menuSettings/' + this.props["data-id"])
    .then( (res) => res.data )
    .then( (_settings) => {
      console.log("settings", _settings)
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
    console.log("TYPE", this.state.menuSettingsArray[index])
    
    let weblinkClasses = this.state.menuSettingsArray[index].type === 'webUrl' ? "form-group" : "hidden";
    const MENUTYPETIP = `You can choose to have the menu item link to a url (weblink) or for a customer to start a new order`;
    const MENUTEXTTIP = `This is the text that will be displayed on the menu (30 character limit)`;
    const WEBLINKTIP = `This is the link that you will send users to if they click on this menu item`;
    
    return (
      <div key={index} className="fb-menu-settings-options row">
        <div id="first-menu-item">
          <div className="form-group" className="col-sm-3">
            <label htmlFor="sel1">Type:&nbsp;</label> <TooltipGlyph tip={MENUTYPETIP} />
            <select className="form-control" id="sel1" ref="first-menu-type" defaultValue={settings.type} onChange={this.typeOnChange.bind(this, index)}>
              <option value="webUrl">Web Link</option>
              <option value="newOrder">New Order</option>
            </select>
          </div>

          <div className="col-sm-8">
            <div className="form-group">
              <label htmlFor="first-menu-text">Menu Text&nbsp;</label> <TooltipGlyph tip={MENUTEXTTIP} />
              <input type="text" className="form-control" id="first-menu-text" ref="first-menu-text" value={settings.menuText} onChange={this.menuTextOnChange.bind(this, index)} />
            </div>

            <div className={weblinkClasses}>
              <label htmlFor="first-weburl">Web Link&nbsp;</label> <TooltipGlyph tip={WEBLINKTIP} />
              <input type="text" className="form-control" id="first-weburl" ref="first-weburl" value={settings.webUrl} onChange={this.webUrlOnChange.bind(this, index)} />
            </div>
          </div>
          <div className="col-sm-1">
            <button className="btn btn-xs btn-danger" onClick={this.deleteMenuItem.bind(null, index)}>x</button>
          </div>
        </div>
      </div>
    )
  },
  onSubmitSettings() {
    // console.log("SUBMITTING");
    this.setState({saveButtonText: 'Saving Settings...', isSaving: true})
    axios.post('/api/menuSettings/' + this.props["data-id"], { menuSettingsArray: this.state.menuSettingsArray })
    .then((newMenuSettingsArray) => {
      this.setState( { menuSettingsArray: newMenuSettingsArray.data, saveButtonText: 'Saving Menu Settings', isSaving: false });
    })
  },
  render () {

    return (
      <div>
        {this.state.menuSettingsArray.map(this.renderSettings)}
        <div className="row">
          <div className="col-sm-12">
            <button className="btn btn-block btn-submit" onClick={this.addItem}>Add Menu Item</button>
          </div>
        </div>
        <br/>
        <div className="row">
          <div className="col-sm-12">
            <button className="btn btn-submit pull-right" onClick={this.onSubmitSettings}><span hidden={!this.state.isSaving}><Spinner size="10px" /></span>{this.state.saveButtonText}</button>
          </div>
        </div>
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