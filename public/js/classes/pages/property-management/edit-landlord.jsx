var React = require("react");
var Router = require("react-router");

module.exports = React.createClass({

  mixins: [Router.State],

  render: function() {

    console.log(this.props);
    return <div>{this.props.params.id}</div>;
  }
})