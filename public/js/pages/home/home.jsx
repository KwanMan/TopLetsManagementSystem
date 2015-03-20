var React = require("react");
var Router = require("react-router");

var PageHeading = require("components/page-heading.jsx");

module.exports = React.createClass({

  mixins: [Router.Navigation, require("mixins/auth-protected")],

  render: function() {
    return (
        <div>
          <PageHeading title="Dashboard" />
        </div>
    );
  }

});