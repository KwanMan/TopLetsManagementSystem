var React = require("react");

var TextInput = React.createClass({
  render: function() {

    return (
      <div className="form-row">
        <span className="label">{this.props.text + ":"}</span>
        <input 
          className="field text-input"
          type="text"
          id={this.props.id}
          onChange={this.props.onTextChange}
          value={this.props.value}
          onFocus={this.props.onFocus} />
      </div>
    );
  }
});


module.exports = TextInput;