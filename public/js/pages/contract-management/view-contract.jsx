var React = require("react");
var Router = require("react-router");

var moment = require("moment");
var formatString = require("lib/format-string");

var ContractDAO = require("dao/contract");

var DataTable = require("components/data-table/data-table.jsx");
var Panel = require("components/panel.jsx");

var ViewContract = React.createClass({

  mixins: [Router.Navigation, require("mixins/auth-protected")],

  getInitialState: function() {
    return {
      contract: null
    };
  },

  componentDidMount: function() {
    var self = this;

    ContractDAO.getContract(self.props.params.id).done(function(contract){
      self.setState({contract: contract});
    }, function(err) {
      self.handleUnauthorisedAccess();
    });
  },

  render: function() {
    var self = this;
    var contract = this.state.contract;
    if (contract === null) {
      return null;
    }

    var title = contract.Property.shortAddress + " - " + contract.year + "/" + (parseInt(contract.year) + 1);

    return (
      <div className="contract-view">
        <Panel title={title} className="contract-panel">
          <div className="form">

            <div className="form-row">
              <div className="label">Start Date:</div>
              <div className="field">{moment(contract.startDate).format('YYYY-MM-DD')}</div>
            </div>

            <div className="form-row">
              <div className="label">End Date:</div>
              <div className="field">{moment(contract.endDate).format('YYYY-MM-DD')}</div>
            </div>

            <div className="form-row">
              <div className="label">Price pppw (£):</div>
              <div className="field">{contract.perWeek.toFixed(2)}</div>
            </div>

          </div>
          <h2>Tenants</h2>
          {this.renderTenantsTable()}
        </Panel>
      </div>
    );
  },

  renderTenantsTable: function() {
    var self = this;
    var contract = this.state.contract;

    var headers = ["Tenant", "Payment Plan"];
    var dataNames = ["tenant", "plan"];

    var data = contract.Tenants.map(function(tenant) {
      var payments = contract.RentPayments.filter(function(payment) {
        return payment.tenant_id === tenant.id;
      });

      return {
        tenant: tenant.fullName,
        plan: self.getPaymentPlan(payments.length)
      };
    });


    return (
      <DataTable
        className="tenant-table"
        headers={headers}
        hideFooter={true}
        dataNames={dataNames}
        data={data} />
    );
  },

  getPaymentPlan: function(x) {
    switch(x) {
      case 12:
        return "Monthly";

      case 4:
        return "Quarterly";

      case 1:
        return "Annually";

      default:
        return "Custom";
    }
  }

});

module.exports = ViewContract;