var React = require("react");
var Router = require("react-router");
var _ = require("lodash");
var Panel = require("components/panel.jsx");

var TextInput = require("components/form/text-input.jsx");

var LandlordDAO = require("dao/landlord");

var NewLandlord = React.createClass({

  mixins: [Router.Navigation, require("mixins/auth-protected"), require("mixins/form")],

  getInitialState: function() {
    return {
      forename: "",
      surname: "",
      email: "",
      contactNumber: ""
    };
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

    var data = _.pick(self.state, 'forename', 'surname', 'email', 'contactNumber');
    LandlordDAO.createLandlord(data).done(function() {
      self.props.showNotification("Landlord successfully created", true);
      self.transitionTo('property-new');
    }, function(err) {
      self.handleUnauthorisedAccess();
    });
  }

});

module.exports = NewLandlord;