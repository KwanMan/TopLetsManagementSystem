var React = require("react");

var _ = require("lodash");

var LandlordDAO = require("dao/landlord");

var SkyLight = require("react-skylight");
var ListSelector = require("./list-selector.jsx");
var Panel = require("./panel.jsx");

var LandlordSelector = React.createClass({

  getInitialState: function() {
    return {
      landlords: [],
      selectedLandlord: null
    };
  },

  render: function() {
    var self = this;

    var supplementary = null;

    if (this.state.selectedLandlord !== null) {
        var landlord = _.find(self.state.landlords, {id: self.state.selectedLandlord});

        supplementary = (
          <Panel title="">
            {"ID: " + landlord.id}
            {"Forename: " + landlord.forename}
            {"Surname: " + landlord.surname}
            {"E-Mail: " + landlord.email}
            {"Contact Number: " + landlord.contactNumber}
            <div className="button" onClick={this.handleConfirm}>Confirm</div>
          </Panel>
        );
    }

    return (
      <SkyLight ref="mainDialog" showOverlay={true}>

        <div className="landlord-selector-wrapper">
          <Panel title="Landlords">
            <ListSelector 
              rows={this.getLandlords()}
              selectedRow={this.state.selectedLandlord}
              onChange={this.handleLandlordChange} />
          </Panel>
          {supplementary}
        </div>
        
      </SkyLight>
    );
  },

  getLandlords: function() {
    var landlords = this.state.landlords.map(function(landlord) {
      return {
          text: landlord.fullName,
          id: landlord.id
        };
    });

    return landlords;
  },

  launch: function(excludedLandlords) {
    // reload api data

    var self = this;

    LandlordDAO.getLandlords().done(function(landlords) {

      if (excludedLandlords.length !== 0 ){
        landlords = landlords.filter(function(landlord) {
          return !_.some(excludedLandlords, {id: landlord.id});
        });
      }

      self.setState(_.assign(self.getInitialState(), {landlords: landlords}));

      self.refs.mainDialog.show();

    });
  },

  handleLandlordChange: function(id) {

    var self = this;

    self.setState({
      selectedLandlord: id
    });

  },

  handleConfirm: function() {
    var self = this;

    self.props.onConfirm(_.find(self.state.landlords, {id: self.state.selectedLandlord}));
    self.refs.mainDialog.hide();
  }

});

module.exports = LandlordSelector;