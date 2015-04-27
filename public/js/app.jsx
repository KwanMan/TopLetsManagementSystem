var React  = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;

var NavBar = require("components/nav-bar.jsx");
var NotificationBar = require("components/notification-bar.jsx");

module.exports = React.createClass({

  mixins: [Router.State, Router.Navigation],


  render: function() {
    return (
      <div className="main-wrapper">
        <NotificationBar ref="notificationBar" />
        <NavBar ref="navBar" currentPath={this.props.currentPath} showNotification={this.showNotification} />
        <div className="content-wrapper">
          <RouteHandler params={this.props.params} showNotification={this.showNotification}  setLoggedIn={this.setLoggedIn} />
        </div>
      </div>
    );
  },

  showNotification: function (message, positive) {
    this.refs.notificationBar.displayMessage(message, positive);
  },

  setLoggedIn: function(loggedIn) {
    this.refs.navBar.setLoggedIn(loggedIn);
  }

});