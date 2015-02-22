var React  = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var NavBar = require("./classes/components/nav-bar.jsx");

module.exports = React.createClass({

  mixins: [Router.State],

  render: function() {

    return (
      <div className="main-wrapper">
        <NavBar currentPath={this.props.currentPath} />
        <div className="content-wrapper">
          <RouteHandler params={this.props.params} />
        </div>
      </div>
    );
  }

});