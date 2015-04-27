var React = require("react/addons");
var Router = require("react-router");

var cx = React.addons.classSet;

var vars = require("lib/vars");
var auth = require("lib/auth");

module.exports = React.createClass({

  mixins: [Router.Navigation, Router.State],

  getInitialState: function() {
    return {
      selectedItem : "contract-management",
      loggedIn: false
    };
  },

  render: function() {
    var self = this;

    var menuItems = [];

    vars.getNavItems().forEach(function(route) {

      var active = self.isActive(route.route, route.params);

      var classes = cx({
        'nav-bar-item': true,
        'is-selected': active,
        'z-1': true
      });

      menuItems.push(
        <div
          className={classes}
          onClick={self.handleNavigation.bind(null, route.route, route.params)} >
          {route.text}
        </div>
      );

      if (route.children && active) {
        route.children.forEach(function(route) {
          var active = self.isActive(route.route, route.params);

          var classes = cx({
            'nav-bar-item': true,
            'is-selected': active,
            'z-2': true
          });

          menuItems.push(
            <div
              className={classes}
              onClick={self.handleNavigation.bind(null, route.route, route.params)} >
              {route.text}
            </div>
          );


        });
      }

    });

    if (self.state.loggedIn) {

      var classes = cx({
        'nav-bar-item': true,
        'is-selected': false,
        'z-1': true
      });

      menuItems.push(
        <div
          className={classes}
          onClick={self.handleLogout} >
          Logout
        </div>
      );
    }
    
    return (
      <div className='nav-bar'>
        <div className="logo" />
          {menuItems}
      </div>
    );

  },

  handleNavigation: function(route, params) {
    this.transitionTo(route, params);
  },

  handleLogout: function() {
    var self = this;
    auth.logout(function() {
      self.props.showNotification("Successfully logged out", true);
      self.setLoggedIn(false);
      self.transitionTo('login');
    });
  },

  setLoggedIn: function(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
  }

});