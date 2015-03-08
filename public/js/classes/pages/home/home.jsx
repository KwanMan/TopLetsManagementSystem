var React = require("react");
var PageHeading = require("../../components/page-heading.jsx");

var Router = require("react-router");

module.exports = React.createClass({

  mixins: [Router.Navigation, require("../../mixins/auth-protected")],

  render: function() {
    return (
        <div>
          <PageHeading title="Dashboard" />
        </div>
    );
  }

});