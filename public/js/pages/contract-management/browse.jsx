var React = require("react");
var Router = require("react-router");

var when = require("when");
var formatString = require("lib/format-string");
var moment = require("moment");
var vars = require("lib/vars");
var _ = require("lodash");

var PropertyDAO = require("dao/property");
var ContractDAO = require("dao/contract");

var Panel = require("components/panel.jsx");
var ListSelector = require("components/list-selector.jsx");
var DataTable = require("components/data-table/data-table.jsx");

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
    this.loadData(nextProps.params);
  },

  componentDidMount: function() {
    this.loadData(this.props.params);
  },

  loadData: function(params) {
    var self = this;

    if (!params.year) {
      this.transitionTo('contract-browse', {
        year: vars.getCurrentYear() + 1
      });
    }

    PropertyDAO.getAllProperties().then(function(properties) {
      return when.map(properties, function(property) {
        return PropertyDAO.getContractInYear(property.id, params.year).then(function(contract) {

          var contractPresent = contract !== null;

          var contractId = contractPresent ? contract.id : null;

          var obj = _.assign(property, {contract_id : contractId});

          if (contractPresent) {
            obj.paymentsExist = contract.RentPayments.length > 0;
          }

          return obj;
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
      <Panel title={this.props.params.year}>
        <ListSelector
          className="status-selector"
          rows={statusOptions} 
          selectedRow={this.state.selectedStatus}
          onChange={this.handleStatusChange}
          hideSearch={true} />
      </Panel>
    );
  },

  renderPropertiesPanel: function() {
    var self = this;

    var data = this.getProperties().map(function(property) {

      var actionText = "";
      var action = null;

      if (property.contract_id !== null) {
        if (property.paymentsExist) {
          actionText = "View Contract";
          action = self.handleViewContract.bind(null, property.contract_id);
        } else {
          actionText = "Setup Payments";
          action = self.handleSetupPayments.bind(null, property.contract_id);
        }
      } else {
        actionText = "Create Contract";
        action = self.handleCreateContract.bind(null, property.id);
      }

      return {
        id: property.id,
        property: formatString.address(property),
        action: (<span className="action" onClick={action}>{actionText}</span>)
      };
    });
    var dataNames = ["property", "action"];

    return (
      <Panel title="Properties">
        <DataTable 
          className="paper"
          hideHeader={true}
          hideFooter={true}
          dataNames={dataNames}
          data={data} />
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

  handleViewContract: function(contract_id) {
    console.log("View contract " + contract_id);
    this.transitionTo('view-contract', {id: contract_id});
  },

  handleSetupPayments: function(contract_id) {
    this.transitionTo('setup-payments', {contractid: contract_id});
  },

  handleCreateContract: function(property_id) {
    this.transitionTo('new-contract', {year: this.props.params.year, propertyid: property_id});
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