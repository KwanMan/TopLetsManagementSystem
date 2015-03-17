var React = require("react");

var PageHeading = React.createClass({
  render: function() {
    return <h1 className="page-heading">{this.props.title}</h1>;
  }
});

module.exports = PageHeading;