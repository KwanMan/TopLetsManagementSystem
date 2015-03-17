var React = require("react/addons");
var Router = require("react-router");
var cx = React.addons.classSet;

var vars = require("lib/vars");

module.exports = React.createClass({

  mixins: [Router.Navigation, Router.State],

  getInitialState: function() {
    return {selectedItem : "contract-management"};
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
    return (
      <div className='nav-bar'>
        <div className="logo" />
          {menuItems}
      </div>
    );

  },

  handleNavigation: function(route, params) {
    this.transitionTo(route, params);
  }

});