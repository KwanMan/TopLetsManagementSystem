var React = require("react");
var Router = require("react-router");
var request = require("superagent");

var PageHeading = require("../../components/page-heading.jsx");
var SkyLight = require("react-skylight");

module.exports = React.createClass({

  mixins: [Router.Navigation],

  getInitialState: function() {
    return {
      username: "",
      password: ""
    };
  },

  render: function() {
    return (
    	<div>
        <PageHeading title="Login" />
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
      </div>
    );
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

    var reqPath = "http://localhost:8000/api/authenticate";

    request
      .post(reqPath)
      .auth(this.state.username, this.state.password)
      .send({lifetime: 60})
      .end(function(err, res) {

        console.log(res);

        if (res.status === 200) {
          sessionStorage.setItem('username', self.state.username);
          sessionStorage.setItem('token', res.body.accessToken);

          self.transitionTo('dashboard');
        } else {
          console.log("login failed with status ", res.status);
        }

      });

  }

});