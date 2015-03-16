var React = require("react");
var Router = require("react-router");
var when = require("when");
var Panel = require("components/panel.jsx");
var ListSelector = require("components/list-selector.jsx");
var DataTable = require("components/data-table/data-table.jsx");
var formatString = require("lib/format-string");

var RentPaymentDAO = require("dao/rent-payment");
var TenantDAO = require("dao/tenant");

var _ = require("lodash");

var Browse = React.createClass({

  mixins: [Router.Navigation, require("mixins/auth-protected")],

  getInitialState: function() {
    return {
      tenants: [],
      selectedTenant: null,
      rentPayments: []
    };
  },

  componentDidMount: function() {
    var self = this;

    TenantDAO.getAllTenants().done(function(tenants) {
      self.setState({
        tenants: tenants
      });
    }, function(err) {
      self.handleUnauthorisedAccess();
    });


  },

  render: function() {
    return (
      <div className="rent-browse">
        {this.renderTenantsPanel()}
        {this.renderTablePanel()}
      </div>
    );
  },

  renderTenantsPanel: function() {
    var rows = this.state.tenants.map(function(tenant) {
      return {
        text: formatString.name(tenant),
        id: tenant.id
      };
    });

    return (
      <Panel title="Tenants">
        <ListSelector
          rows={rows}
          selectedRow={this.state.selectedTenant}
          onChange={this.handleTenantChange} />
      </Panel>
    );
  },

  renderTablePanel: function() {
    if (this.state.selectedTenant === null) {
      console.log("null?");
      return null;
    }

    console.log("this?");

    var headers = ["Date Due", "Property", "Status", null];

    var dataNames = ["date", "property", "status", "action"];

    var unpaid = [];
    var paid = [];

    this.state.rentPayments.forEach(function(payment) {
      var status;
      if (payment.paid) {
        status = "Paid";
      } else {
        if (new Date(payment.dueDate) < new Date()) {
          status = "Overdue";
        } else {
          status = "Pending";
        }
      }

      var row = {
        id: payment.id,
        date: formatString.date(payment.dueDate),
        property: formatString.addressShort(payment.Contract.Property),
        status: status,
        action: payment.paid ? "N/A" : "Mark Paid"
      };

      if (payment.paid) {
        // Paid goes in reverse order to show latest paid first
        paid.unshift(row);
      } else {
        // Unpaid shows in ascending order to show most overdue first
        unpaid.push(row);
      }
      
    });

    var data = unpaid.concat(paid);



    return (
      <Panel>
        <DataTable
        headers={headers}
        dataNames={dataNames}
        data={data}
        hideFooter={true}
        onCol3Click={this.handlePaymentPay} />
      </Panel>
    );


  },

  handleTenantChange: function(id) {
    var self = this;

    TenantDAO.getRentPayments(id).done(function(rentPayments) {
      self.setState({
        selectedTenant: id,
        rentPayments: rentPayments
      });
    }, function(err) {
      self.handleUnauthorisedAccess();
    });
  },

  handlePaymentPay: function(id) {
    var self = this;

    RentPaymentDAO.pay(id).done(function() {
      self.handleTenantChange(self.state.selectedTenant);
    }, function(err) {
      self.handleUnauthorisedAccess();
    });
  }

});

module.exports = Browse;