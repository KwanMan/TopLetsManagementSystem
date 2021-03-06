var React = require("react");
var Router = require("react-router");

var _ = require("lodash");
var moment = require("moment");
var formatString = require("lib/format-string");
var validator = require("validator");

var PropertyDAO = require("dao/property");

var Panel = require("components/panel.jsx");
var PropertySelector = require("components/property-selector.jsx");
var TextInput = require("components/form/text-input.jsx");
var TextAreaInput = require("components/form/text-area-input.jsx");
var DateInput = require("components/form/date-input.jsx");

var NewReceipt = React.createClass({

  mixins: [Router.Navigation, require("mixins/auth-protected"), require("mixins/form")],

  getInitialState: function() {
    return {
      payee: "",
      amount: "",
      date: moment(),
      note: "",
      property: null,
      file: null,
      showFileInput: true
    };
  },

  getFieldConstraints: function() {
    return [{
      value: this.state.property,
      validator: this.validator.isNotNull,
      message: "Please choose a property"
    }, {
      value: this.state.payee,
      validator: validator.isNotWhitespaceOrEmpty,
      message: "Payee cannot be empty"
    }, {
      value: this.state.amount,
      validator: validator.isFloat,
      message: "Please enter a valid amount"
    }];
  },

  render: function() {
    var propertyOpt;

    if (this.state.property === null){
      propertyOpt = (<div className="button" onClick={this.handleChoosePropertyButton}>Select</div>);
    } else {
      propertyOpt = (<div className="field clickable" onClick={this.handleChoosePropertyButton}>{this.state.property.longAddress}</div>);
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

            <TextAreaInput
              text="Note"
              id="note"
              value={this.state.note}
              onTextChange={this.handleTextChange} />

            {this.state.showFileInput ? (<input type="file" onChange={this.handleFileChange} />) : null}

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

  handleFileChange: function(e) {
    this.setState({
      file: e.target.files[0]
    });
  },

  handleCreateButton: function() {
    var self = this;

    var error = this.validateFields();
    if (error !== null) {
      self.props.showNotification(error, false);
      return;
    }

    var data = {
      payee: self.state.payee,
      amount: self.state.amount,
      date: self.state.date.toJSON()
    };

    if (self.state.note !== "") {
      data.note = self.state.note;
    }

    var attachments = [];

    if (self.state.file !== null) {
      attachments .push({
        field: "receipt",
        file: self.state.file
      });
    }

    PropertyDAO.createReceipt(self.state.property.id, data, attachments).done(function() {
      self.props.showNotification("Receipt created", true);
      self.setState({
        payee: "",
        amount: "",
        note: "",
        showFileInput: false
      });
      self.setState({showFileInput: true});
    }, self.handleApiError);
  }

});

module.exports = NewReceipt;