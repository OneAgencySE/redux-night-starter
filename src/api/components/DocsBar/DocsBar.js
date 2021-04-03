import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './DocsBar.css';
import localStorageUtil from '../../utils/localStorageUtil';

const setSettingState = (settingsState) => (state) => ({
  settings: Object.assign({}, state.settings, settingsState),
});

class DocsBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSettings: false,
      settings: localStorageUtil.getSettings(),
    };

    this.toggleSettings = this.toggleSettings.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleSettings() {
    this.setState({
      showSettings: !this.state.showSettings,
    });
  }

  handleChange(event) {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;

    this.setState(setSettingState({ [event.target.name]: value }));
  }

  handleReset() {
    this.setState(setSettingState(localStorageUtil.getSettings()));
  }

  handleSubmit() {
    Object.keys(this.state.settings).forEach((name) => {
      localStorage.setItem(name, this.state.settings[name]);
    });
  }

  render() {
    const { className } = this.props;
    return (
      <div className={classnames('DocsBar', className)}>
        <div className="DocsBar__bar">
          <div className="DocsBar__section">
            <i className="material-icons">description</i>
            <a className="Docs__link" href="./api/docs/index.html">
              API DOCS
            </a>
          </div>
          <div className="DocsBar__section">
            <button
              className={classnames(
                'DocsBar__settingsButton',
                this.state.showSettings && 'DocsBar__settingsButton--active',
              )}
              type="button"
              onClick={this.toggleSettings}
            >
              <i className="material-icons">settings</i>
            </button>
          </div>
        </div>
        {this.state.showSettings && (
          <div className="DocsBar__settings">
            <form className="DocsBar__form" onSubmit={this.handleSubmit}>
              <div className="DocsBar__field">
                <label className="DocsBar__fieldLabel" htmlFor="putCartItem">
                  Delay Response
                </label>
                <input
                  className="DocsBar__fieldInput"
                  type="number"
                  id="delayResponse"
                  name="delayResponse"
                  value={this.state.settings.delayResponse}
                  onChange={this.handleChange}
                />
              </div>
              <fieldset className="DocsBar__fieldset">
                <legend className="DocsBar__fieldsetLegend">
                  Toggle Network Error
                </legend>
                <div className="DocsBar__field">
                  <input
                    type="checkbox"
                    id="getProductsNetworkError"
                    name="getProductsNetworkError"
                    checked={this.state.settings.getProductsNetworkError}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="getProductsNetworkError">Get Products</label>
                </div>
                <div className="DocsBar__field">
                  <input
                    type="checkbox"
                    id="getProductNetworkError"
                    name="getProductNetworkError"
                    checked={this.state.settings.getProductNetworkError}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="getProductNetworkError">Get Product</label>
                </div>
                <div className="DocsBar__field">
                  <input
                    type="checkbox"
                    id="getCartItemsNetworkError"
                    name="getCartItemsNetworkError"
                    checked={this.state.settings.getCartItemsNetworkError}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="getCartItemsNetworkError">
                    Get Cart Items
                  </label>
                </div>
                <div className="DocsBar__field">
                  <input
                    type="checkbox"
                    id="deleteCartItemsNetworkError"
                    name="deleteCartItemsNetworkError"
                    checked={this.state.settings.deleteCartItemsNetworkError}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="deleteCartItems">Delete Cart Items</label>
                </div>
                <div className="DocsBar__field">
                  <input
                    type="checkbox"
                    id="deleteCartItemNetworkError"
                    name="deleteCartItemNetworkError"
                    checked={this.state.settings.deleteCartItemNetworkError}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="deleteCartItemNetworkError">
                    Delete Cart Item
                  </label>
                </div>
                <div className="DocsBar__field">
                  <input
                    type="checkbox"
                    id="postCartItemNetworkError"
                    name="postCartItemNetworkError"
                    checked={this.state.settings.postCartItemNetworkError}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="postCartItemNetworkError">
                    Post Cart Item
                  </label>
                </div>
                <div className="DocsBar__field">
                  <input
                    type="checkbox"
                    id="putCartItemNetworkError"
                    name="putCartItemNetworkError"
                    checked={this.state.settings.putCartItemNetworkError}
                    onChange={this.handleChange}
                  />
                  <label htmlFor="putCartItemNetworkError">Put Cart Item</label>
                </div>
              </fieldset>
              <button
                type="button"
                className="DocsBar__formButton"
                onClick={this.handleReset}
              >
                Reset
              </button>
              <button
                type="submit"
                className="DocsBar__formButton DocsBar__formButton--primary"
              >
                Save and Reload
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

DocsBar.propTypes = {
  className: PropTypes.string,
};

export default DocsBar;
