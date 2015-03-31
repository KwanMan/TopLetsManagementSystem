var React = require("react");
var Router = require("react-router");

var _ = require("lodash");
var validator = require("validator");

var LandlordDAO = require("dao/landlord");

var Panel = require("components/panel.jsx");
var LandlordSelector = require("components/landlord-selector.jsx");
var TextInput = require("components/form/text-input.jsx");

var NewProperty = React.createClass({

  mixins: [Router.Navigation, require("mixins/auth-protected"), require("mixins/form")],

  getInitialState: function() {
    return {
      number: "",
      street: "",
      postcode: "",
      landlord: null,
      bedrooms: ""
    };
  },

  getFieldConstraints: function() {
    return [{
      value: this.state.landlord,
      validator: this.validator.isNotNull,
      message: "Please select a landlord"
    }, {
      value: this.state.number,
      validator: validator.isNotWhitespaceOrEmpty,
      message: "House number/name cannot be empty"
    }, {
      value: this.state.street,
      validator: validator.isNotWhitespaceOrEmpty,
      message: "Street name cannot be empty"
    }, {
      value: this.state.postcode,
      validator: validator.isNotWhitespaceOrEmpty,
      message: "Post Code cannot be empty"
    }, {
      value: this.state.postcode,
      validator: validator.isPostcode,
      message: "Post Code is invalid"
    }, {
      value: this.state.bedrooms,
      validator: validator.isInt,
      message: "Please enter a valid number of bedrooms"
    }];
  },

  render: function() {
    var landlordOpt;

    if (this.state.landlord === null){
      landlordOpt = (
        <div
          className="button"
          onClick={this.handleChooseLandlordButton}>
          Select
        </div>
      );
    } else {
      landlordOpt = (
        <div
          className="field clickable"
          onClick={this.handleChooseLandlordButton}>
          {this.state.landlord.fullName}
        </div>
      );
    }

    return (
      <div className="property-new">
        <Panel title="New Property">
          <div className="form">

            <div className="form-row">
              <div className="label">Landlord:</div>
              {landlordOpt}
            </div>

            <TextInput
              text="Name/Number"
              id="number"
              value={this.state.number}
              onTextChange={this.handleTextChange} />

            <TextInput
              text="Street"
              id="street"
              value={this.state.street}
              onTextChange={this.handleTextChange} />

            <TextInput
              text="Post Code"
              id="postcode"
              value={this.state.postcode}
              onTextChange={this.handleTextChange} />

            <TextInput
              text="Bedrooms"
              id="bedrooms"
              value={this.state.bedrooms}
              onTextChange={this.handleTextChange} />

            <div className="button" onClick={this.handleCreateButton}>Create</div>

          </div>
        </Panel>

        <LandlordSelector ref="landlordSelector" onConfirm={this.handleLandlordSelected} />

      </div>
    );
  },

  handleChooseLandlordButton: function() {
    this.refs.landlordSelector.launch([]);
  },

  handleLandlordSelected: function(landlord) {
    this.setState({landlord: landlord});
  },

  handleCreateButton: function() {
    var self = this;

    var error = this.validateFields();
    if (error !== null) {
      self.props.showNotification(error, false);
      return;
    }

    var data = _.pick(self.state, 'number', 'street', 'postcode', 'bedrooms');
    LandlordDAO.createProperty(self.state.landlord.id, data).done(function() {
      self.props.showNotification("Property successfully created", true);
      self.transitionTo('property-management');
    }, self.handleApiError);
  }

});

module.exports = NewProperty;