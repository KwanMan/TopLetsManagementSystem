var React = require("react");
var Router = require("react-router");

var _ = require("lodash");
var validator = require("validator");

var LandlordDAO = require("dao/landlord");

var Panel = require("components/panel.jsx");
var TextInput = require("components/form/text-input.jsx");
var TextAreaInput = require("components/form/text-area-input.jsx");

var EditLandlord = React.createClass({

  mixins: [Router.Navigation, require("mixins/auth-protected"), require("mixins/form")],

  getInitialState: function() {
    return {
      forename: "",
      surname: "",
      email: "",
      contactNumber: "",
      address: ""
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
    }, {
      value: this.state.address,
      validator: validator.isNotWhitespaceOrEmpty,
      message: "Please enter an address"
    }];
  },

  componentWillReceiveProps: function(nextProps) {
    this.loadData(nextProps);
  },

  componentDidMount: function() {
    this.loadData(this.props);
  },

  loadData: function(props) {
    var self = this;

    LandlordDAO.getLandlord(props.params.id).then(function(landlord) {
      self.setState(_.pick(landlord, ['forename', 'surname', 'email', 'contactNumber', 'address']));
    });
  },

  render: function() {
    return (
      <div className="landlord-new">
        <Panel title="Update landlord details">
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
              text="E-Mail"
              id="email"
              value={this.state.email}
              onTextChange={this.handleTextChange} />

            <TextInput
              text="Contact Number"
              id="contactNumber"
              value={this.state.contactNumber}
              onTextChange={this.handleTextChange} />

            <TextAreaInput
              text="Address"
              id="address"
              value={this.state.address}
              onTextChange={this.handleTextChange} />

            <div className="button" onClick={this.handleUpdateButton}>Update</div>

          </div>
        </Panel>

      </div>
    );
  },

  handleUpdateButton: function() {
    var self = this;

    var error = this.validateFields();
    if (error !== null) {
      self.props.showNotification(error, false);
      return;
    }

    var data = _.pick(self.state, 'forename', 'surname', 'email', 'contactNumber', 'address');
    LandlordDAO.updateLandlord(this.props.params.id, data).done(function() {
      self.props.showNotification("Landlord successfully updated", true);
      self.transitionTo('property-browse');
    }, function(err) {
      self.handleUnauthorisedAccess();
    });
  }

});

module.exports = EditLandlord;