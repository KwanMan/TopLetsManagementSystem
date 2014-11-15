var React  = require("react");
var Router = require("react-router");
var mui    = require("material-ui");

var Nav = require("./nav.jsx");

module.exports = React.createClass({

  render: function() {
    var title = "TopLets - " + this.props.activeRouteHandler().props.pageTitle;
    return (
      <mui.AppCanvas predefinedLayout={1}>
        <mui.AppBar onMenuIconClick={this._onMenuIconClick} title={title}>
        </mui.AppBar>
        <Nav ref="nav" />
        <div className="mui-app-content-canvas">
          <this.props.activeRouteHandler />
        </div>
      </mui.AppCanvas>
    );
  },

  _onMenuIconClick: function (){
    this.refs.nav.toggle();
  }

});