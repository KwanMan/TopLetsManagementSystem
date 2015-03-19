var React = require("react");
var Router = require("react-router");
var _ = require("lodash");
var Panel = require("components/panel.jsx");
var PropertySelector = require("components/property-selector.jsx");
var moment = require("moment");
var formatString = require("lib/format-string");

var TextInput = require("components/form/text-input.jsx");
var DateInput = require("components/form/date-input.jsx");

var PropertyDAO = require("dao/property");

var NewReceipt = React.createClass({

  mixins: [Router.Navigation, require("mixins/auth-protected"), require("mixins/form")],

  getInitialState: function() {
    return {
      payee: "",
      amount: "",
      date: moment(),
      property: null
    };
  },

  render: function() {

    var propertyOpt;

    if (this.state.property === null){
      propertyOpt = (<div className="button" onClick={this.handleChoosePropertyButton}>Select</div>);
    } else {
      propertyOpt = (<div className="field clickable" onClick={this.handleChoosePropertyButton}>{formatString.address(this.state.property)}</div>);
    }

    return (
      <div className="receipt-new">
        <Panel title="New Receipt">
          <div className="form">

            <div className="form-row">
              <div className="label">Property:</div>
              {propertyOpt}
            </div>

           <DateInput
              text="Start Date"
              date={this.state.date}
              onChange={this.handleDateChange} />

            <TextInput
              text="Payee"
              id="payee"
              value={this.state.payee}
              onTextChange={this.handleTextChange} />

            <TextInput
              text="Amount"
              id="amount"
              value={this.state.amount}
              onTextChange={this.handleTextChange} />

            <div className="button" onClick={this.handleCreateButton}>Create</div>

          </div>
        </Panel>

        <PropertySelector ref="propertySelector" onConfirm={this.handlePropertySelected} />

      </div>
    );
  },

  handleDateChange: function(moment) {
    this.setState({
      date: moment
    });
  },

  handleChoosePropertyButton: function() {
    this.refs.propertySelector.launch([]);
  },

  handlePropertySelected: function(property) {
    this.setState({property: property});
  },

  handleCreateButton: function() {
    var self = this;

    var data = {
      payee: self.state.payee,
      amount: self.state.amount,
      date: self.state.date.toJSON()
    };

    PropertyDAO.createReceipt(self.state.property.id, data).done(function() {
      self.props.showNotification("Receipt created", true);
      self.setState({
        payee: "",
        amount: ""
      });
    }, function(err) {
      self.handleUnauthorisedAccess();
    });
  }

});

module.exports = NewReceipt;