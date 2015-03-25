var React = require("react");
var Router = require("react-router");

var when = require("when");
var _ = require("lodash");

var LandlordDAO = require("dao/landlord");
var PropertyDAO = require("dao/property");

var Panel = require("components/panel.jsx");
var ListSelector = require("components/list-selector.jsx");
var DataTable = require("components/data-table/data-table.jsx");

var Browse = React.createClass({

  mixins: [Router.Navigation, require("mixins/auth-protected")],

  getInitialState: function() {
    return {
      landlords: [],
      properties: [],
      selectedLandlord: null,
      selectedProperty: null
    };
  },

  componentDidMount: function() {
    var self = this;

    var tasks = [];

    tasks.push(LandlordDAO.getLandlords());
    tasks.push(PropertyDAO.getAllProperties());

    when.all(tasks).done(function(res) {
      self.setState({
        landlords: res[0],
        properties: res[1],
        selectedLandlord: "all"
      });
    }, function(err) {
      self.handleUnauthorisedAccess();
    });
  },

  render: function() {

    return (
      <div className="property-browse">
        {this.renderLandlordsPanel()}
        {this.renderPropertiesPanel()}
      </div>
    );
  },

  renderLandlordsPanel: function() {
    var self = this;

    var data = self.state.landlords.map(function(landlord) {
      return {
        text: landlord.fullName,
        id: landlord.id
      };
    });

    data.unshift({
      text: "View All",
      id: "all"
    });

    return (
      <Panel title="Landlords">
        <ListSelector
          className="landlord-selector"
          rows={data} 
          selectedRow={this.state.selectedLandlord} 
          onChange={this.handleLandlordChange} />
      </Panel>
    );
  },

  renderPropertiesPanel: function() {
    var self = this;

    if (self.state.selectedLandlord === null) {
      return null;
    }

    var properties = [];

    if (this.state.selectedLandlord === "all") {
      properties = self.state.properties;
    } else {
      properties = self.state.properties.filter(function(property) {
        return property.Landlord.id === self.state.selectedLandlord;
      });
    }

    var headers = ["Address", "Rooms", ""];
    var dataNames = ["address", "rooms", "edit"];

    var data = properties.map(function(property) {
      return {
        id: property.id,
        address: property.shortAddress,
        rooms: property.bedrooms,
        edit: (<span className="action" onClick={self.handleEditProperty.bind(null, property.id)}>edit details</span>)
      };
    });

    return (
      <Panel>
        <DataTable
          className="property-table"
          headers={headers}
          hideFooter={true}
          dataNames={dataNames}
          data={data} />
      </Panel>
    );
  },

  handleEditLandlord: function(id) {
    this.transitionTo('edit-landlord', {id: id});
  },

  handleEditProperty: function(id) {
    this.transitionTo('edit-property', {id: id});
  },
  
  handleLandlordChange: function(id) {
    this.setState({
      selectedLandlord: id
    });
  },

  handlePropertyChange: function(id) {
    this.setState({
      selectedProperty: id
    });
  }

});

module.exports = Browse;