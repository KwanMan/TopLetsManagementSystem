var React = require("react");
var Router = require("react-router");

var Link = Router.Link;

var navLinks = [{
  text: "Dashboard",
  route: "home"
},{
  text: "Property Management",
  route: "property-management"
}, {
  text: "Contract Management",
  route: "contract-management"
}, {
  text: "Settings",
  route: "settings"
}];

module.exports = React.createClass({

  getInitialState: function() {
    return {selectedItem : "contract-management"}
  },

  render: function() {

    var menuItems = navLinks.map(function(navLink) {
      var className = "nav-bar-item";
      if (this.props.currentPath.indexOf(navLink.route) > -1) {
        className += " is-selected";
      }
      return (<div className={className}><Link to={navLink.route}>{navLink.text}</Link></div>);
    }.bind(this));

    return (
      <div className='nav-bar'>
        <div className="logo" />
          {menuItems}
      </div>
    );

  }

});