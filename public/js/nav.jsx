var React  = require("react");
var Router = require("react-router");
var mui    = require("material-ui");

var menuItems = [
  {route: "home", text: "Home"},
  {route: "settings", text: "Settings"}
];

module.exports = React.createClass({

  mixins: [Router.ActiveState, Router.Navigation],

  render: function (){
    return (
      <mui.LeftNav
        ref="nav"
        docked={false}
        menuItems={menuItems}
        isInitiallyOpen={true}
        selectedIndex={this._getSelectedIndex()}
        onChange={this._onNavChange} />
    );
  },

  toggle: function (){
    this.refs.nav.toggle();
  },

  _getSelectedIndex: function (){
    for (var i = 0; i < menuItems.length; i++){
      var item = menuItems[i];
      if (item.route && this.isActive(item.route)){
        return i;
      }
    }
  },

  _onNavChange: function (e, key, payload) {
    this.transitionTo(payload.route);
  }

});