var React = require("react");

var NotificationBar = React.createClass({

  getInitialState: function() {
    return {
      state: "hidden",
      message: ""
    };
  },

  render: function() {

    return (
      <div className={"notification-bar " + this.state.state}>
        {this.state.message}
      </div>
    );


  },

  displayMessage: function (message, positive) {

    var self = this;

    var duration = 1500;

    this.setState({
      message: message,
      state: positive ? "positive" : "negative"
    });

    setTimeout(function() {
      self.setState({
        message: "",
        state: "hidden"
      });
    }, duration);

  }

});

module.exports = NotificationBar;