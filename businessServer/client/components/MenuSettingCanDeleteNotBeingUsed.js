import React from 'react';
import TooltipGlyph from './TooltipGlyph';

const MenuSetting = React.createClass({
  getInitialState() {
    return {
      ...this.props.settings
    }
  },
  typeOnChange (e) {
    this.setState({ type: e.target.value })
  },
  menuTextOnChange(e) {
    this.setState({ menuText: e.target.value })
  },
  webUrlOnChange(e) {
    this.setState({ webUrl: e.target.value })
  },
  render() {
    return (
      <div>
        <div id="first-menu-item">
          <div className="form-group">
            <label htmlFor="sel1">Select list:</label>
            <select className="form-control" id="sel1" ref="first-menu-type" defaultValue={this.state.type} onChange={this.typeOnChange}>
              <option value="webUrl">Web Link</option>
              <option value="newOrder">New Order</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="first-menu-text">Menu Text</label><TooltipGlyph tip="CHANGE THIS" />
            <input type="text" className="form-control" id="first-menu-text" ref="first-menu-text" value={this.state.menuText} onChange={this.menuTextOnChange} />
          </div>

          <div className="form-group">
            <label htmlFor="first-weburl">Web Link</label><TooltipGlyph tip="SOME STUFF" />
            <input type="text" className="form-control" id="first-weburl" ref="first-weburl" value={this.state.webUrl} onChange={this.webUrlOnChange} />
          </div>
        </div>
        <button className="btn btn=danger" onClick="delete">x</button>
      </div>
    )
  }
})

export default MenuSetting;