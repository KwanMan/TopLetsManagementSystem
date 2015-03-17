var React = require("react");

var Panel = React.createClass({

  mixins: [require("mixins/classable")],

  render: function() {
    var classes = this.getClasses("panel");
    return (
      <div className={classes}>
        <div className="panel-heading">{this.props.title}</div>
        <div className="panel-contents">
          {this.props.children}
        </div>
      </div>
    );
  }

});

module.exports = Panel;