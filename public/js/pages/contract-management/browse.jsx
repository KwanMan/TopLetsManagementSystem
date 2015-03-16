var React = require("react");
var Router = require("react-router");
var when = require("when");

var Panel = require("components/panel.jsx");
var ListSelector = require("components/list-selector.jsx");
var DataTable = require("components/data-table/data-table.jsx");
var formatString = require("lib/format-string");

var PropertyDAO = require("dao/property");
var ContractDAO = require("dao/contract");

var _ = require("lodash");

var Browse = React.createClass({

  mixins: [Router.Navigation, require("mixins/auth-protected")],

  getInitialState: function() {
    return {
      selectedStatus: "all",
      selectedProperty: null,
      properties: []
    };
  },

  componentWillReceiveProps: function(nextProps) {
    // When transitioning between years the component stays mounted and this will get called instead
    this.loadData(this.props.params.year);
  },

  componentDidMount: function() {
    this.loadData(this.props.params.year);
  },

  loadData: function(year) {
    var self = this;

    PropertyDAO.getAllProperties().then(function(properties) {
      return when.map(properties, function(property) {
        return PropertyDAO.getContractInYear(property.id, self.props.params.year).then(function(contract) {
          var contractPresent = contract !== null;

          return _.assign(property, {contractExists : contractPresent});
        });
      });
    }).then(function(properties) {
      self.setState({
        properties: properties
      });
    }, function(err) {
      self.handleUnauthorisedAccess();
    });
  },

  render: function() {

    return (
      <div className="contract-browse">
        {this.renderStatusPanel()}
        {this.renderPropertiesPanel()}
      </div>
    );

  },

  renderStatusPanel: function() {
    var statusOptions = [{
      text: "Unoccupied",
      id: "unoccupied" 
    }, {
      text: "Occupied",
      id: "occupied"
    }, {
      text: "All",
      id: "all"
    }];

    return (
      <Panel title="Status">
        <ListSelector
          className="status-selector"
          rows={statusOptions} 
          selectedRow={this.state.selectedStatus}
          onChange={this.handleStatusChange} />
      </Panel>
    );
  },

  renderPropertiesPanel: function() {
    var headers = ["Property", "Status", null];

    var dataNames = ["property", "action"];

    var data = this.getProperties().map(function(property) {
      return {
        id: property.id,
        property: formatString.address(property),
        action: property.contractExists ? "View Contract" : "Create Contract"
      };
    });

    return (
      <Panel title="Properties">
        <DataTable 
          className="paper"
          hideHeader={true}
          hideFooter={true}
          dataNames={dataNames}
          data={data}
          onCol1Click={this.handleContractSelect} />
      </Panel>
    );

    
  },

  getProperties: function() {
    if (!this.state.selectedStatus){
      return [];
    }

    switch (this.state.selectedStatus) {
      case "unoccupied":
        return this.state.properties.filter(function(property) {
          return !property.contractExists;
        });

      case "occupied":
        return this.state.properties.filter(function(property) {
          return property.contractExists;
        });

      case "all":
        return this.state.properties;

    }

  },

  handleStatusChange: function(id) {
    this.setState({
      selectedStatus: id,
      selectedProperty: null,
      contract: null
    });
  },

  handleContractSelect: function(id) {
    var property = _.find(this.state.properties, function(property) {
      return property.id === id;
    });

    if (property.contractExists) {
      console.log("View contract for " + property.id);
    } else {
      this.transitionTo('new-contract', {year: this.props.params.year, propertyid: property.id});
    }

  },

  handlePropertyChange: function(id) {

    var self = this;

    ContractDAO.getForPropertyInYear(self.props.params.year, id).done(function(contract) {

      self.setState({
        selectedProperty: id,
        contract: contract
      });
    }, function(err) {
      self.handleUnauthorisedAccess();
    });
    
  }

});

module.exports = Browse;