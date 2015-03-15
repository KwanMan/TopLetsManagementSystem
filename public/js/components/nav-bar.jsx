var React = require("react");
var Router = require("react-router");

var Link = Router.Link;

var navLinks = [{
  text: "Dashboard",
  route: "dashboard"
},{
  text: "Property Management",
  route: "property-management"
}, {
  text: "Contract Management",
  route: "contract-management",
  params: {
    year: 2014
  }
}, {
  text: "Report Management",
  route: "report-management"
}, {
  text: "Settings",
  route: "settings"
}];

module.exports = React.createClass({

  mixins: [Router.Navigation],

  getInitialState: function() {
    return {selectedItem : "contract-management"};
  },

  render: function() {

    var menuItems = navLinks.map(function(navLink) {
      var className = "nav-bar-item";
      if (this.props.currentPath.indexOf(navLink.route) > -1) {
        className += " is-selected";
      }
      return (<div className={className} onClick={this.handleNavigation.bind(this, navLink.route, navLink.params)}>{navLink.text}</div>);
    }.bind(this));

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