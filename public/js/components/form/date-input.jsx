var React = require("react");

var DateSelector = require("./date-selector.jsx");

var DateInput = React.createClass({

  render: function() {
    return (
      <div className="form-row">
        <span className="label">{this.props.text + ":"}</span>
        <input 
          className="field text-input"
          type="text"
          value={this.props.date.format('YYYY-MM-DD')}
          onFocus={this.handleTextFocus} />
        <DateSelector
          ref="selector"
          value={this.props.date}
          onChange={this.props.onChange} />
      </div>
    );
  },

  handleTextFocus: function() {
    this.refs.selector.open();
  }

});

module.exports = DateInput;