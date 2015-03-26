var React = require("react");
var Router = require("react-router");

var when = require("when");
var _ = require("lodash");
var formatString = require("lib/format-string");

var RentPaymentDAO = require("dao/rent-payment");
var TenantDAO = require("dao/tenant");

var Panel = require("components/panel.jsx");
var ListSelector = require("components/list-selector.jsx");
var DataTable = require("components/data-table/data-table.jsx");

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
        text: tenant.fullName,
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
    var self = this;
    if (this.state.selectedTenant === null) {
      return null;
    }

    var headers = ["Date Due", "Property", "Amount", "Status", null];

    var dataNames = ["date", "property", "amount", "status", "action"];

    var unpaid = [];
    var paid = [];

    this.state.rentPayments.forEach(function(payment) {
      var status;
      var action;
      if (payment.paid) {
        status = "Received";
        if (payment.property_report_id === null) {
          action = self.handelPaymentUnpay.bind(null, payment.id);
          actionText = "Mark as unpaid";
        } else {
          action = null;
          actionText = null;
        }
      } else {
        if (new Date(payment.dueDate) < new Date()) {
          status = "Overdue";
        } else {
          status = "Pending";
        }
        action = self.handlePaymentPay.bind(null, payment.id);
        actionText = "Mark as paid";
      }

      var row = {
        id: payment.id,
        date: formatString.date(payment.dueDate),
        property: payment.Contract.Property.shortAddress,
        amount: formatString.currency(payment.amount),
        status: status,
        action: (<span onClick={action} className="action">{actionText}</span>)
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
        hideFooter={true} />
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
      self.props.showNotification("Payment marked as paid", true);
      self.handleTenantChange(self.state.selectedTenant);
    }, function(err) {
      self.handleUnauthorisedAccess();
    });
  },

  handelPaymentUnpay: function(id) {
    var self = this;

    RentPaymentDAO.unpay(id).done(function() {
      self.props.showNotification("Payment marked as unpaid", true);
      self.handleTenantChange(self.state.selectedTenant);
    }, function(err) {
      self.handleUnauthorisedAccess();
    });
  }

});

module.exports = Browse;