var React = require("react");
var Router = require("react-router");

module.exports = React.createClass({

  mixins : [Router.Navigation, require("mixins/auth-protected")],

  render: function (){
    return (<div>Settings</div>);
  }
  
});