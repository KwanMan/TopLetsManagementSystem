var React = require("react");
var Router = require("react-router");
var when = require("when");

var Panel = require("../../components/panel.jsx");
var ListSelector = require("../../components/list-selector.jsx");

var PropertyDAO = require("../../../dao/property");
var ContractDAO = require("../../../dao/contract");

var _ = require("lodash");

var Browse = React.createClass({

  getInitialState: function() {
    return {
      selectedStatus: "all",
      selectedProperty: null,
      contractlessProperties: [],
      contractedProperties: []
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.loadData(this.props.params.year);
  },

  componentDidMount: function() {
    this.loadData(this.props.params.year);
  },

  loadData: function(year) {
    var self = this;

    var promises = [];
    promises.push(PropertyDAO.getAllProperties());
    promises.push(ContractDAO.getAllInYear(year));

    when.all(promises).then(function(res) {
      var properties = res[0];
      var contracts = res[1];

      var contracted = [];
      var contractless = [];

      properties.forEach(function(property) {

        var matchingContracts = contracts.filter(function(contract) {
          return contract.property_id === property.id;
        });

        var item = {
          text: property.number + " " + property.street,
          id: property.id
        };

        if (matchingContracts.length === 0) {
          contractless.push(item);
        } else {
          contracted.push(item);
        }

      });

      self.setState({
        contractedProperties: contracted,
        contractlessProperties: contractless,
        selectedProperty: null
      });

    });
  },

  render: function() {

    var statusOptions = [];
    statusOptions.push({ text: "Unoccupied", id: "unoccupied" });
    statusOptions.push({ text: "Occupied", id: "occupied" });
    statusOptions.push({ text: "All", id: "all" });

    var statusPanel = (

      <Panel title="Status">
        <ListSelector
          className="status-selector"
          rows={statusOptions} 
          selectedRow={this.state.selectedStatus}
          onChange={this.handleStatusChange} />
      </Panel>

    );

    var contractPanel = null;
    var contract = this.state.contract;

    if (this.state.selectedProperty !== null) {

      if (contract !== null) {

        contractPanel = (
          <Panel title={this.state.selectedProperty}>
            <div>{"Start Date: " + contract.startDate}</div>
            <div>{"End Date: " + contract.endDate}</div>
          </Panel>
        );

      } else {

        contractPanel = (
          <Panel title={"New contract for " + this.state.selectedProperty}>
            <div className="form">

              <div className="form-row">
                <span className="label">Start Date</span>
                <input className="field" type="text" />
              </div>

              <div className="form-row">
                <span className="label">End Date</span>
                <input className="field" type="text" />
              </div>

              <div className="form-row">
                <span className="label">Tenant 1</span>
                <input className="field" type="text" />
              </div>

              <div className="form-row">
                <span className="label">Tenant 2</span>
                <input className="field" type="text" />
              </div>

            </div>
          </Panel>
        );
      }

    }


    return (
      <div className="contract-browse">
        {statusPanel}
        <Panel title="Properties">
          <ListSelector
            className="property-selector"
            rows={this.getProperties()}
            selectedRow={this.state.selectedProperty}
            onChange={this.handlePropertyChange} />
        </Panel>
        {contractPanel}
      </div>
    );

  },

  getProperties: function() {
    if (!this.state.selectedStatus){
      return [];
    }

    switch (this.state.selectedStatus) {
      case "unoccupied":
        return this.state.contractlessProperties;

      case "occupied":
        return this.state.contractedProperties;

      case "all":
        return this.state.contractlessProperties.concat(this.state.contractedProperties);

    }

  },

  handleStatusChange: function(id) {
    this.setState({
      selectedStatus: id,
      selectedProperty: null,
      contract: null
    });
  },

  handlePropertyChange: function(id) {

    var self = this;

    ContractDAO.getForPropertyInYear(self.props.params.year, id).done(function(contract) {

      self.setState({
        selectedProperty: id,
        contract: contract
      });
    });
    
  },

  flattenData: function(data) {
    var flattened = data.map(function(landlord) {

      return landlord.properties.map(function(property) {


        return property.contracts.map(function(contract) {

          return {
            landlord: _.omit(landlord, "properties"),
            property: _.omit(property, "contracts"),
            contract: contract,
          };

        });

      });

    });

    return _.flattenDeep(flattened);
  }

});

module.exports = Browse;