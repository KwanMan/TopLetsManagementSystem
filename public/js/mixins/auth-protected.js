var auth = require("lib/auth");

module.exports = {

  componentWillMount: function() {
    if (!auth.loggedIn()) {
      this.transitionTo('login');
    }
  },

  handleApiError: function(err) {
    var self = this;
    if (err.status === 401) {
      self.handleUnauthorisedAccess();
      return;
    }
    self.props.showNotification(err.message, false);
  },

  handleUnauthorisedAccess: function() {
    this.props.showNotification("Unauthorised - Please log in", false);
    auth.logout();
    this.transitionTo('login');
  }

};