var React = require("react");
var Router = require("react-router");

var formatString = require("lib/format-string");
var moment = require("moment");
var validator = require("validator");

var PropertyDAO = require("dao/property");

var Panel = require("components/panel.jsx");
var TenantSelector = require("components/tenant-selector.jsx");
var TextInput = require("components/form/text-input.jsx");
var DataTable = require("components/data-table/data-table.jsx");
var DateInput = require("components/form/date-input.jsx");

var NewContract = React.createClass({

  mixins: [Router.Navigation, require("mixins/auth-protected"), require("mixins/form")],

  getInitialState: function() {
    var startDate = [this.props.params.year, "07", "01"].join('-');
    var endDate = [parseInt(this.props.params.year) + 1, "06", "27"].join('-');

    return {
      tenants: [],
      property: null,
      startDate: moment(startDate, "YYYY-MM-DD"),
      endDate: moment(endDate, "YYYY-MM-DD"),
      perWeek: null
    };
  },

  getFieldConstraints: function() {
    return [{
      value: this.state.perWeek,
      validator: validator.isFloat,
      message: "Please enter a valid price per week"
    }, {
      value: this.state.tenants,
      validator: function(v) { return v.length > 0; },
      message: "Please add tenants"
    }];
  },

  componentDidMount: function() {
    var self = this;

    PropertyDAO.getProperty(self.props.params.propertyid).done(function(property) {
      self.setState({
        property: property
      });
    }, function(err) {
      self.handleUnauthorisedAccess();
    });
  },

  render: function() {
    var title = null;

    if (this.state.property !== null){
      title = "New Contract for " + this.state.property.shortAddress + " - " + this.props.params.year + "/" + (parseInt(this.props.params.year) + 1);
    }

    return (
      <div className="contract-new">
        <Panel title={title} className="contract-panel">
          <div className="form">
            <DateInput
              text="Start Date"
              date={this.state.startDate}
              onChange={this.handleStartDateChange} />

            <DateInput
              text="End Date"
              date={this.state.endDate}
              onChange={this.handleEndDateChange} />

            <TextInput
              text="Price pppw (£)"
              id="perWeek"
              value={this.state.perWeek}
              onTextChange={this.handleTextChange} />
          </div>
          {this.renderTenantsTable()}
          <div className="button" onClick={this.handleSubmit}>Submit</div>
        </Panel>

        <TenantSelector ref="tenantSelector" onConfirm={this.handleTenantAdded} />
      </div>
    );
  },

  renderTenantsTable: function() {
    var self = this;

    var headers = ["Tenants", null];
    var footers = [null];

    footers.push(<span className="action" onClick={self.handleAddTenant}>Add Tenant</span>);

    var dataNames = ["name", "action"];
    var data = this.state.tenants.map(function(tenant) {
      return {
        id: tenant.id,
        name: tenant.fullName,
        action: (<span className="action" onClick={self.handleTenantRemove.bind(null, tenant.id)}>remove</span>)
      };
    });

    return (
        <DataTable
          headers={headers}
          footers={footers}
          dataNames={dataNames}
          data={data} />  
    );
  },

  handleStartDateChange: function(moment) {
    this.setState({
      startDate: moment
    });
  },

  handleEndDateChange: function(moment) {
    this.setState({
      endDate: moment
    });
  },

  handleTenantRemove: function(id) {
    var newTenants = this.state.tenants.filter(function(tenant) {
      return tenant.id !== id;
    });

    this.setState({
      tenants: newTenants
    });
  },

  handleAddTenant: function() {
    this.refs.tenantSelector.launch(this.state.tenants);
  },

  handleTenantAdded: function(tenant) {
    var tenants = this.state.tenants.concat(tenant);

    this.setState({
      tenants: tenants
    });
  },

  handleSubmit: function() {
    var self = this;

    var error = this.validateFields();
    if (error !== null) {
      self.props.showNotification(error, false);
      return;
    }

    var tenants = this.state.tenants.map(function(tenant) {
      return tenant.id;
    });

    var data = {
      startDate: this.state.startDate.toJSON(),
      endDate: this.state.endDate.toJSON(),
      perWeek: this.state.perWeek,
      year: this.props.params.year,
      tenants: tenants
    };

    PropertyDAO.createContract(this.props.params.propertyid, data).done(function() {
      self.props.showNotification("Contract created", true);
      self.transitionTo("contract-browse", {year: self.props.params.year});
    }, function(err) {
      self.handleUnauthorisedAccess();
    });
  }

});

module.exports = NewContract;