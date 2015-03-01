var React = require("react");
var Panel = require("../../components/panel.jsx");
var ListSelector = require("../../components/list-selector.jsx");

var _ = require("lodash");

var getLandlordsFromAPI = function() {
  var landlords = [{
    text: "Arianna Ramirez",
    id: "aramirez",
    properties: [
      {text: "69 Rydal Avenue", id: "69 Rydal Avenue"},
      {text: "108 Paget Street", id: "108 Paget Street"}
    ]
  }, {
    text: "Sergio Davidson",
    id: "sdavidson",
    properties: [
      {text: "8315 W Alexander Rd", id: "8315 W Alexander Rd"},
      {text: "7966 Saddle Dr", id: "7966 Saddle Dr"}
    ]
  }, {
    text: "Mattie Wheeler",
    id: "mwheeler",
    properties: [
      {text: "5634 Hogan St", id: "5634 Hogan St"},
      {text: "6462 Eason Rd", id: "6462 Eason Rd"}
    ]
  }, {
    text: "Suzanne Burke",
    id: "sburke",
    properties: [
      {text: "2606 Walnut Hill Ln", id: "2606 Walnut Hill Ln"},
      {text: "6649 Cedar Dr", id: "6649 Cedar Dr"}
    ]
  }, {
    text: "Harry Cole",
    id: "hcole",
    properties: [
      {text: "2419 Paddington Ct", id: "2419 Paddington Ct"},
      {text: "8247 Robinson Rd", id: "8247 Robinson Rd"}
    ]
  }, {
    text: "Penny Perry",
    id: "pperry",
    properties: [
      {text: "6803 Adams St", id: "6803 Adams St"},
      {text: "2806 Lone Wolf Trail", id: "2806 Lone Wolf Trail"}
    ]
  }, {
    text: "Bella Alvarez",
    id: "balvarez",
    properties: [
      {text: "5724 Kelly Dr", id: "5724 Kelly Dr"},
      {text: "6037 Lakewview Drcowper St", id: "6037 Lakewview Drcowper St"}
    ]
  }];

  var allProperties = [];
  landlords.forEach(function(landlord) {
    allProperties = allProperties.concat(landlord.properties);
  });

  landlords.unshift({text: "View All", id: "viewAll", properties: allProperties});
  return landlords;
};

var Browse = React.createClass({
  getInitialState: function() {

    return {
      landlords: [],
      selectedLandlord: null,
      selectedProperty: null};

  },

  componentDidMount: function() {
    var landlords = getLandlordsFromAPI();
    this.setState({
      landlords: landlords,
      selectedLandlord: landlords[0].id
    });
  },

  render: function() {

    var finalPanel = null;
    if (this.state.selectedProperty) {
      finalPanel = (
        <Panel title={this.getSelectedProperty().text}>

        </Panel>
      );
    }

    return (
      <div className="property-browse">
        <Panel title="Landlords">
          <ListSelector
            className="landlord-selector"
            rows={this.getLandlords()} 
            selectedRow={this.state.selectedLandlord} 
            onChange={this.handleLandlordChange} />
        </Panel>
        <Panel title="Properties">
          <ListSelector
            className="property-selector"
            rows={this.getProperties()}
            selectedRow={this.state.selectedProperty}
            onChange={this.handlePropertyChange} />
        </Panel>
        {finalPanel}
      </div>
    );
  },

  getLandlords: function() {
    return this.state.landlords.map(function(landlord) {
      return _.omit(landlord, "properties");
    });
  },

  getProperties: function() {

    if (this.state.selectedLandlord === null) {
      return [];
    }

    return this.state.landlords.filter(function(landlord) {
      return landlord.id === this.state.selectedLandlord;
    }.bind(this))[0].properties;
  },

  getSelectedProperty: function() {
    return this.state.landlords.filter(function(landlord) {
      return landlord.id === this.state.selectedLandlord;
    }.bind(this))[0].properties.filter(function(property) {
      return property.id === this.state.selectedProperty; 
    }.bind(this))[0];
  },
  
  handleLandlordChange: function(id) {

    this.setState({
      selectedLandlord: id,
      selectedProperty: null
    });
  },

  handlePropertyChange: function(id) {

    this.setState({selectedProperty: id});
  }

});

module.exports = Browse;