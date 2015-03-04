var React = require("react");
var when = require("when");
var Panel = require("../../components/panel.jsx");
var ListSelector = require("../../components/list-selector.jsx");

var LandlordDAO = require("../../../dao/landlord");
var PropertyDAO = require("../../../dao/property");

var _ = require("lodash");

var Browse = React.createClass({
  getInitialState: function() {

    return {
      landlordsList: [],
      propertiesList: [],
      selectedLandlord: null,
      selectedProperty: null};

  },

  componentDidMount: function() {

    var self = this;

    LandlordDAO.getLandlords().done(function(data) {

      var landlords = data.map(function(landlord) {

        return {
          text: landlord.forename + " " +  landlord.surname,
          id: landlord.id
        };

      });

      landlords.unshift({
        text: "View All",
        id: "all"
      });

      self.setState({
        landlordsList: landlords,
        selectedLandlord: null
      });

    });
  },

  render: function() {

    var landlordsPanel = (
      <Panel title="Landlords">
        <ListSelector
          className="landlord-selector"
          rows={this.state.landlordsList} 
          selectedRow={this.state.selectedLandlord} 
          onChange={this.handleLandlordChange} />
      </Panel>
    );

    var propertiesPanel = null;
    if (this.state.selectedLandlord) {
      propertiesPanel = (
        <Panel title="Properties">
          <ListSelector
            className="property-selector"
            rows={this.state.propertiesList}
            selectedRow={this.state.selectedProperty}
            onChange={this.handlePropertyChange} />
        </Panel>
      );
    }

    var propertyPanel = null;
    if (this.state.selectedProperty) {
      var property = this.state.propertyDetails;
      propertyPanel = (
        <Panel title={"Details for " + property.number + " " + property.street}>

        </Panel>
      );
    }

    return (
      <div className="property-browse">
        {landlordsPanel}
        {propertiesPanel}
        {propertyPanel}
      </div>
    );
  },
  
  handleLandlordChange: function(id) {

    var self = this;

    when.promise(function(resolve) {

      if (id === "all") {
        resolve(PropertyDAO.getAllProperties());
      } else {
        resolve(LandlordDAO.getProperties(id));
      }

    }).then(function(properties) {

      var list = properties.map(function(property) {

        return {
          text: property.number + " " + property.street,
          id: property.id
        };

      });

      self.setState({
        selectedLandlord: id,
        propertiesList: list
      });

    });

  },

  handlePropertyChange: function(id) {

    var self = this;

    PropertyDAO.getProperty(id).done(function(property) {

      self.setState({
        selectedProperty: id,
        propertyDetails: property
      });

    });
  }

});

module.exports = Browse;