var React = require("react");

var TextAreaInput = React.createClass({

  mixins: [require("mixins/classable")],

  render: function() {

    var classes = this.getClasses("form-row");

    return (
      <div className={classes}>
        <span className="label">{this.props.text + ":"}</span>
        <textarea 
          className="field text-area-input"
          type="text"
          id={this.props.id}
          onChange={this.props.onTextChange}
          value={this.props.value}
          onFocus={this.props.onFocus} />
      </div>
    );
  }

});

module.exports = TextAreaInput;