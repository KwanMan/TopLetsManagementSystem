var React = require("react");
var Router = require("react-router");
var RouteHandler = Router.RouteHandler;
var PageHeading = require("../../components/page-heading.jsx");

module.exports = React.createClass({

  mixins: [Router.State],

  render: function() {
    return (
      <div>
        <PageHeading title="Property Management" />
        <RouteHandler params={this.props.params} />
      </div>
    );
  }

});