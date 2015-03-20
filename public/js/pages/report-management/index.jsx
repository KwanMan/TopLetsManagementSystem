var React = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;

var PageHeading = require("components/page-heading.jsx");

module.exports = React.createClass({

  mixins: [Router.State, Router.Navigation, require("mixins/auth-protected")],

  render: function() {
    return (
      <RouteHandler params={this.props.params} />
    );
  }

});