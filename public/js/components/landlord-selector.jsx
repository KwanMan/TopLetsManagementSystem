var React = require("react");
var _ = require("lodash");

var SkyLight = require("react-skylight");
var ListSelector = require("./list-selector.jsx");
var Panel = require("./panel.jsx");

var LandlordDAO = require("dao/landlord");

var LandlordSelector = React.createClass({

  getInitialState: function() {

    return {
      landlords: [],
      selectedLandlord: "new",
      newLandlord: {
        forename: "",
        surname: "",
        email: "",
        contactNumber: ""
      }
    };

  },

  render: function() {

    var supplementary = null;

    if (this.state.selectedLandlord !== null) {
      if(this.state.selectedLandlord === "new") {

        supplementary = (

          <Panel title="">

            <div className="form paper">

              <div className="form-row">
                <span className="label">Forename</span>
                <input className="field" type="text" value={this.state.newLandlord.forename} onChange={this.handleForenameChange} />
              </div>

              <div className="form-row">
                <span className="label">Surname</span>
                <input className="field" type="text" value={this.state.newLandlord.surname} onChange={this.handleSurnameChange} />
              </div>

              <div className="form-row">
                <span className="label">E-mail</span>
                <input className="field" type="text" value={this.state.newLandlord.email} onChange={this.handleEmailChange} />
              </div>

              <div className="form-row">
                <span className="label">Contact Number</span>
                <input className="field" type="text" value={this.state.newLandlord.contactNumber} onChange={this.handleContactNumberChange} />
              </div>

              <div className="button" onClick={this.handleCreate}>Confirm</div>

            </div>
          </Panel>

        );

      } else {

        var landlord = this.getSelectedLandlordFromList();

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
          text: landlord.forename + " " + landlord.surname,
          id: landlord.id
        };
    });

    landlords.unshift({
      text: "New",
      id: "new"
    });

    return landlords;

  },

  launch: function(excludedLandlords) {

    // reload api data

    var self = this;

    LandlordDAO.getLandlords().done(function(landlords) {

      if (excludedLandlords.length !== 0 ){
        landlords = landlords.filter(function(landlord) {
          var matching = excludedLandlords.filter(function(v) {
            return v.id === landlord.id;
          });

          return matching.length === 0;
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

  handleForenameChange: function(e) {

    var newLandlord = this.state.newLandlord;
    newLandlord.forename = e.target.value;

    this.setState({
      newLandlord: newLandlord
    });
  },

  handleSurnameChange: function(e) {

    var newLandlord = this.state.newLandlord;
    newLandlord.surname = e.target.value;

    this.setState({
      newLandlord: newLandlord
    });
  },

  handleEmailChange: function(e) {

    var newLandlord = this.state.newLandlord;
    newLandlord.email = e.target.value;

    this.setState({
      newLandlord: newLandlord
    });
  },

  handleContactNumberChange: function(e) {

    var newLandlord = this.state.newLandlord;
    newLandlord.contactNumber = e.target.value;

    this.setState({
      newLandlord: newLandlord
    });
  },

  handleCreate: function() {

    var self = this;

    LandlordDAO.createLandlord(self.state.newLandlord).then(function(landlord) {
      self.props.onConfirm(landlord);
      self.refs.mainDialog.hide();
    });

  },

  handleConfirm: function() {

    var self = this;

    self.props.onConfirm(this.getSelectedLandlordFromList());
    self.refs.mainDialog.hide();

  
  },

  getSelectedLandlordFromList: function(){

    var self = this;

    var idx = _.findIndex(self.state.landlords, 'id', self.state.selectedLandlord);

    if (idx !== -1) {
      return self.state.landlords[idx];
    }
    return null;
  }

});

module.exports = LandlordSelector;