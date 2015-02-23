var React = require("react");
var Panel = require("../../components/panel.jsx");
var ListSelector = require("../../components/list-selector.jsx");

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
      {text: "10 Brook Road", id: "10 Brook Road"},
      {text: "99 Rudolph Boulevard", id: "99 Rudolph Boulevard"}
    ]
  }, {
    text: "Mattie Wheeler",
    id: "mwheeler",
    properties: [
      {text: "576 Hippie Corner", id: "576 Hippie Corner"},
      {text: "77 Feet Road", id: "77 Feet Road"}
    ]
  }, {
    text: "Suzanne Burke",
    id: "sburke",
    properties: [
      {text: "24 His Street", id: "24 His Street"},
      {text: "997 Another Name", id: "997 Another Name"}
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
}

var Browse = React.createClass({
  getInitialState: function() {

    this.landlords = getLandlordsFromAPI();

    return {
      selectedLandlord: this.landlords[0],
      selectedProperty: null};

  },

  render: function() {

    var finalPanel = null;
    if (this.state.selectedProperty) {
      finalPanel = (
        <Panel title={this.state.selectedProperty.text}>

        </Panel>
      );
    }

    return (
      <div className="property-browse">
        <Panel title="Landlords">
          <ListSelector
            className="landlord-selector"
            rows={this.landlords} 
            selectedRow={this.state.selectedLandlord} 
            onChange={this.handleLandlordChange} />
        </Panel>
        <Panel title="Properties">
          <ListSelector
            className="property-selector"
            rows={this.state.selectedLandlord.properties}
            selectedRow={this.state.selectedProperty}
            onChange={this.handlePropertyChange} />
        </Panel>
        {finalPanel}
      </div>
    );
  },
  
  handleLandlordChange: function(id) {
    var selectedLandlord = this.landlords.filter(function(landlord) {
      return landlord.id === id;
    })[0];

    this.setState({
      selectedLandlord: selectedLandlord,
      selectedProperty: null
    });
  },

  handlePropertyChange: function(id) {
    var selectedProperty = this.state.selectedLandlord.properties.filter(function(property) {
      return property.id == id;
    })[0];
    this.setState({selectedProperty: selectedProperty});
  }

});

module.exports = Browse;