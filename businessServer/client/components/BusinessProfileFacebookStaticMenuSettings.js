import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import TooltipGlyph from './TooltipGlyph';

const BusinessProfileFacebookStaticMenuSettings = React.createClass({
  handleSubmit (e) {
    e.preventDefault();
    console.log("handle submit for business profile info")
  },
  render () {
    const MENUTYPETIP = `You can choose to have the menu item link to a url (weblink) or for a customer to start a new order`;
    const MENUTEXTTIP = `This is the text that will be displayed on the menu (30 character limit)`;
    const WEBLINKTIP = `This is the link that you will send users to if they click on this menu item`;

    return (
      <div>
        <h1>Persistent Menu for Facebook</h1>
        <form>

          <div className="first-menu-item">
            <div className="btn-group" data-toggle="buttons">
              <h3>Select the type of menu item</h3><TooltipGlyph tip={MENUTYPETIP} />
              <label className="btn btn-primary active">
                <input type="radio" name="first-menu-option" id="option1" autoComplete="off" defaultChecked /> Web Link
              </label>
              <label className="btn btn-primary">
                <input type="radio" name="first-menu-option" id="option2" autoComplete="off" /> New Order
              </label>
              <label className="btn btn-primary">
                <input type="radio" name="first-menu-option" id="option3" autoComplete="off" /> Deactivate
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="first-menu-text">Menu Text</label><TooltipGlyph tip={MENUTEXTTIP} />
              <input type="text" className="form-control" id="first-menu-text" />
            </div>

            <div className="form-group">
              <label htmlFor="first-weburl">Web Link</label><TooltipGlyph tip={WEBLINKTIP} />
              <input type="text" className="form-control" id="first-weburl" />
            </div>
          </div>

          <div className="second-menu-item">
            <h3>Select the type of menu item</h3><TooltipGlyph tip={MENUTYPETIP} />
            <div className="btn-group" data-toggle="buttons">
              <label className="btn btn-primary active">
                <input type="radio" name="second-menu-option" id="option1" autoComplete="off" defaultChecked /> Web Link
              </label>
              <label className="btn btn-primary">
                <input type="radio" name="second-menu-option" id="option2" autoComplete="off" /> New Order
              </label>
              <label className="btn btn-primary">
                <input type="radio" name="second-menu-option" id="option3" autoComplete="off" /> Inactive
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="second-menu-text">Menu Text</label>
              <input type="text" className="form-control" id="second-menu-text" />
            </div>

            <div className="form-group">
              <label htmlFor="second-weburl">Web Link</label>
              <input type="text" className="form-control" id="second-weburl" />
            </div>
          </div>

          <div className="third-menu-item">
            <h3>Select the type of menu item</h3><TooltipGlyph tip={MENUTYPETIP} />
            <div className="btn-group" data-toggle="buttons">
              <label className="btn btn-primary active">
                <input type="radio" name="third-menu-option" id="option1" autoComplete="off" defaultChecked /> Web Link
              </label>
              <label className="btn btn-primary">
                <input type="radio" name="third-menu-option" id="option2" autoComplete="off" /> New Order
              </label>
              <label className="btn btn-primary">
                <input type="radio" name="third-menu-option" id="option3" autoComplete="off" /> Inactive
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="third-menu-text">Menu Text</label>
              <input type="text" className="form-control" id="third-menu-text" />
            </div>

            <div className="form-group">
              <label htmlFor="third-weburl">Web Link</label>
              <input type="text" className="form-control" id="third-weburl" />
            </div>
          </div>

          <div className="fourth-menu-item">
            <h3>Select the type of menu item</h3><TooltipGlyph tip={MENUTYPETIP} />
            <div className="btn-group" data-toggle="buttons">
              <label className="btn btn-primary active">
                <input type="radio" name="fourth-menu-option" id="option1" autoComplete="off" defaultChecked /> Web Link
              </label>
              <label className="btn btn-primary">
                <input type="radio" name="fourth-menu-option" id="option2" autoComplete="off" /> New Order
              </label>
              <label className="btn btn-primary">
                <input type="radio" name="fourth-menu-option" id="option3" autoComplete="off" /> Inactive
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="fourth-menu-text">Menu Text</label>
              <input type="text" className="form-control" id="fourth-menu-text" />
            </div>

            <div className="form-group">
              <label htmlFor="fourth-weburl">Web Link</label>
              <input type="text" className="form-control" id="fourth-weburl" />
            </div>
          </div>

          <div className="fifth-menu-item">
            <h3>Select the type of menu item</h3><TooltipGlyph tip={MENUTYPETIP} />
            <div className="btn-group" data-toggle="buttons">
              <label className="btn btn-primary active">
                <input type="radio" name="fifth-menu-option" id="option1" autoComplete="off" defaultChecked /> Web Link
              </label>
              <label className="btn btn-primary">
                <input type="radio" name="fifth-menu-option" id="option2" autoComplete="off" /> New Order
              </label>
              <label className="btn btn-primary">
                <input type="radio" name="fifth-menu-option" id="option3" autoComplete="off" /> Inactive
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="fifth-menu-text">Menu Text</label>
              <input type="text" className="form-control" id="fifth-menu-text" />
            </div>

            <div className="form-group">
              <label htmlFor="fifth-weburl">Web Link</label>
              <input type="text" className="form-control" id="fifth-weburl" />
            </div>
          </div>

          <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Update</button>
       </form>
      </div>
    )
  }
})

export default BusinessProfileFacebookStaticMenuSettings
/* https://developers.facebook.com/docs/messenger-platform/thread-settings/persistent-menu */
// above url is for facebook info on persistent menus