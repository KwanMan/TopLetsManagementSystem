var React = require("react");
var Router = require("react-router");

var _ = require("lodash");
var validator = require("validator");

var PropertyDAO = require("dao/property");

var Panel = require("components/panel.jsx");
var TextInput = require("components/form/text-input.jsx");

var EditProperty = React.createClass({

  mixins: [Router.Navigation, require("mixins/auth-protected"), require("mixins/form")],

  getInitialState: function() {
    return {
      number: "",
      street: "",
      postcode: "",
      landlord: "",
      bedrooms: ""
    };
  },

  getFieldConstraints: function() {
    return [{
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

  componentWillReceiveProps: function(nextProps) {
    this.loadData(nextProps);
  },

  componentDidMount: function() {
    this.loadData(this.props);
  },

  loadData: function(props) {
    var self = this;

    PropertyDAO.getProperty(props.params.id).done(function(property) {
      var data = _.pick(property, ['number', 'street', 'postcode', 'bedrooms']);
      self.setState(_.assign(data, {landlord: property.Landlord.fullName}));
    }, self.handleApiError);
  },

  render: function() {
    return (
      <div className="property-new">
        <Panel title="Update Property">
          <div className="form">

            <div className="form-row">
              <div className="label">Landlord:</div>
              <div className="field">{this.state.landlord}</div>
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

    var data = _.pick(self.state, 'number', 'street', 'postcode', 'bedrooms');
    PropertyDAO.updateProperty(self.props.params.id, data).done(function() {
      self.props.showNotification("Property successfully updated", true);
      self.transitionTo('property-browse');
    }, self.handleApiError);
  }

});

module.exports = EditProperty;