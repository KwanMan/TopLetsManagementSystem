var auth = require("lib/auth");

module.exports = {

  componentWillMount: function() {

    if (!auth.loggedIn()) {
      this.transitionTo('login');
    }

  },

  handleUnauthorisedAccess: function() {
    this.props.showNotification("Unauthorised - Please log in", false);
    auth.logout();
    this.transitionTo('login');
  }

};