var React = require("react");
var Router = require("react-router");
var _ = require("lodash");
var auth = require("lib/auth");
var hotkey = require("react-hotkey");

hotkey.activate();

var PageHeading = require("components/page-heading.jsx");
var SkyLight = require("react-skylight");
var Panel = require("components/panel.jsx");

module.exports = React.createClass({

  mixins: [Router.Navigation, hotkey.Mixin('handleHotkey')],

  getInitialState: function() {
    return {
      username: "",
      password: ""
    };
  },

  render: function() {

    return (
    	<div className="login">
        <Panel title="Login">
          <div className="form">

            <div className="form-row">
              <span className="label">Username</span>
              <input className="field" type="text" value={this.state.username} onChange={this.handleUsernameChange} />
            </div>

            <div className="form-row">
              <span className="label">Password</span>
              <input className="field" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
            </div>

            <div className="button" onClick={this.handleLoginButton}>Login</div>

          </div>
        </Panel>
      </div>
    );
  },

  handleHotkey: function(e) {
    if (e.nativeEvent.keyIdentifier === "Enter") {
      this.handleLoginButton();
    }
  },

  handleUsernameChange: function(e) {
    this.setState({
      username: e.target.value
    });
  },

  handlePasswordChange: function(e) {
    this.setState({
      password: e.target.value
    });
  },

  handleLoginButton: function() {

    var self = this;

    auth.login(this.state.username, this.state.password, function(successful) {
      if (successful) {
        self.props.showNotification("Successfully Logged In", true);
        self.transitionTo('dashboard');
      } else {
        self.props.showNotification("Incorrect credentials, please try again.", false);
        self.setState(self.getInitialState());
      }
    });
  }

});