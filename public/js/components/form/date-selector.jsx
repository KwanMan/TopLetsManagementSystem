var React = require("react");

var _ = require("lodash");

var DatePicker = require("react-date-picker");
var SkyLight = require("react-skylight");

var DateSelector = React.createClass({

  render: function() {

    return (
      <SkyLight ref="mainDialog" showOverlay={true}>
        <DatePicker
          date={this.props.date}
          onChange={this.handleChange} />
      </SkyLight>
    );

  },

  handleChange: function(moment, dateString) {
    this.refs.mainDialog.hide();
    this.props.onChange(moment, dateString);
  },

  open: function() {
    this.refs.mainDialog.show();
  }

});

module.exports = DateSelector;