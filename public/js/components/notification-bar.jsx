var React = require("react");

var NotificationBar = React.createClass({

  getInitialState: function() {
    return {
      state: "hidden",
      message: "",
      hiddenTimeout: null
    };
  },

  render: function() {
    var icon = null;

    switch(this.state.state) {
      case "positive":
        icon = (<i className="fa fa-check-circle"></i>);
        break;
      case "negative":
        icon = (<i className="fa fa-times-circle"></i>);
        break;
    }

    return (
      <div className={"notification-bar " + this.state.state}>
        {icon}
        {" " + this.state.message}
      </div>
    );


  },

  displayMessage: function (message, positive) {
    var self = this;

    if (this.state.hiddenTimeout !== null) {
      clearTimeout(this.state.hiddenTimeout);
    }

    var duration = 1500;

    this.setState({
      message: message,
      state: positive ? "positive" : "negative",
      hiddenTimeout: setTimeout(function() {
        self.setState({
          message: "",
          state: "hidden"
        });
      }, duration)
    });
  }

});

module.exports = NotificationBar;