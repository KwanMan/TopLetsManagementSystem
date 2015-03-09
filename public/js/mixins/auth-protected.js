var auth = require("lib/auth");

module.exports = {

  componentWillMount: function() {

    if (!auth.loggedIn()) {
      this.transitionTo('login');
    }

  },

  handleUnauthorisedAccess: function() {
    auth.logout();
    this.transitionTo('login');
  }

};