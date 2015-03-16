var React = require("react");
var Router = require("react-router");
var Panel = require("components/panel.jsx");
var TenantSelector = require("components/tenant-selector.jsx");
var TextInput = require("components/form/text-input.jsx");
var DataTable = require("components/data-table/data-table.jsx");
var formatString = require("lib/format-string");
var moment = require("moment");

var DatePicker = require("react-date-picker");
var DateInput = require("components/form/date-input.jsx");
var PropertyDAO = require("dao/property");

var NewContract = React.createClass({

  mixins: [Router.Navigation, require("mixins/auth-protected", require("mixins/form"))],

  getInitialState: function() {

    var startDate = [this.props.params.year, "07", "01"].join('-');
    var endDate = [parseInt(this.props.params.year) + 1, "06", "28"].join('-');

    return {
      tenants: [],
      property: null,
      startDate: moment(startDate, "YYYY-MM-DD"),
      endDate: moment(endDate, "YYYY-MM-DD")
    };

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

    var address = null;

    if (this.state.property !== null){
      address = formatString.address(this.state.property) + " - " + this.props.params.year + "/" + (this.props.params.year+1);
    }

    return (
      <div className="contract-new">
        <Panel title="Details">
          <div className="form paper">
            <DateInput
              text="Start Date"
              date={this.state.startDate}
              onChange={this.handleStartDateChange} />

            <DateInput
              text="End Date"
              date={this.state.endDate}
              onChange={this.handleEndDateChange} />
            
            <div className="button" onClick={this.handleAddTenantButton}>Add tenant</div>

            {this.renderTenantsTable()}
            <div className="button" onClick={this.handleSubmit}>Submit</div>

          </div>
        </Panel>

        <TenantSelector ref="tenantSelector" onConfirm={this.handleTenantAdded} />
      </div>
    );
  },

  renderTenantsTable: function() {

    var headers = ["Tenants", null];

    var dataNames = ["name", "action"];
    var data = this.state.tenants.map(function(tenant) {
      return {
        id: tenant.id,
        name: formatString.name(tenant),
        action: "Remove"
      };
    });

    return (
      
        <DataTable
          headers={headers}
          hideFooter={true}
          dataNames={dataNames}
          data={data}
          onCol1Click={this.handleTenantRemove} />
       
      
    );
  },

  handleStartDateChange: function(moment, dateString) {
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

  handleAddTenantButton: function() {
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

    var tenants = this.state.tenants.map(function(tenant) {
      return tenant.id;
    });

    var data = {
      startDate: this.state.startDate.toJSON(),
      endDate: this.state.endDate.toJSON(),
      year: this.props.params.year,
      tenants: tenants
    };

    PropertyDAO.createContract(this.props.params.propertyid, data).done(function() {
      self.transitionTo();
    }, function(err) {
      self.handleUnauthorisedAccess();
    });
  }

});

module.exports = NewContract;