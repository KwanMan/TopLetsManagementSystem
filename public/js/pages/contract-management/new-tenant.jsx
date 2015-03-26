var React = require("react");
var Router = require("react-router");

var _ = require("lodash");
var validator = require("validator");

var TenantDAO = require("dao/tenant");

var Panel = require("components/panel.jsx");
var TextInput = require("components/form/text-input.jsx");
var TextAreaInput = require("components/form/text-area-input.jsx");

var NewLandlord = React.createClass({

  mixins: [Router.Navigation, require("mixins/auth-protected"), require("mixins/form")],

  getInitialState: function() {
    return {
      forename: "",
      surname: "",
      idNumber: "",
      email: "",
      contactNumber: ""
    };
  },

  getFieldConstraints: function() {
    return [{
      value: this.state.forename,
      validator: validator.isNotWhitespaceOrEmpty,
      message: "Forename cannot be empty"
    }, {
      value: this.state.surname,
      validator: validator.isNotWhitespaceOrEmpty,
      message: "Surname cannot be empty"
    }, {
      value: this.state.email,
      validator: validator.isNotWhitespaceOrEmpty,
      message: "E-mail cannot be empty"
    }, {
      value: this.state.email,
      validator: validator.isEmail,
      message: "Invalid e-mail address."
    }, {
      value: this.state.contactNumber,
      validator: validator.isNotWhitespaceOrEmpty,
      message: "Contact number cannot be empty"
    }, {
      value: this.state.contactNumber,
      validator: validator.isUKPhoneNumber,
      message: "Invalid contact number."
    }];
  },

  render: function() {
    return (
      <div className="landlord-new">
        <Panel title="New Landlord">
          <div className="form">

            <TextInput
              text="Forename"
              id="forename"
              value={this.state.forename}
              onTextChange={this.handleTextChange} />

            <TextInput
              text="Surname"
              id="surname"
              value={this.state.surname}
              onTextChange={this.handleTextChange} />

            <TextInput
              text="ID Number"
              id="idNumber"
              value={this.state.idNumber}
              onTextChange={this.handleTextChange} />

            <TextInput
              text="E-Mail"
              id="email"
              value={this.state.email}
              onTextChange={this.handleTextChange} />

            <TextInput
              text="Contact Number"
              id="contactNumber"
              value={this.state.contactNumber}
              onTextChange={this.handleTextChange} />

            <div className="button" onClick={this.handleCreateButton}>Create</div>

          </div>
        </Panel>

      </div>
    );
  },

  handleCreateButton: function() {
    var self = this;

    var error = this.validateFields();
    if (error !== null) {
      self.props.showNotification(error, false);
      return;
    }

    var data = _.pick(self.state, 'forename', 'surname', 'email', 'contactNumber');
    if (self.state.idNumber !== "") {
      data.idNumber = self.state.idNumber;
    }
    TenantDAO.createTenant(data).done(function() {
      self.props.showNotification("Tenant successfully created", true);
      self.setState({
        forename: "",
        surname: "",
        idNumber: "",
        email: "",
        contactNumber: ""
      });
    }, function(err) {
      self.handleUnauthorisedAccess();
    });
  }

});

module.exports = NewLandlord;