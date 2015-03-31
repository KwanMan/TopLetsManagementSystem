var React = require("react");
var Router = require("react-router");

var moment = require("moment");
var formatString = require("lib/format-string");

var ContractDAO = require("dao/contract");

var DataTable = require("components/data-table/data-table.jsx");
var Panel = require("components/panel.jsx");

var SetupPayment = React.createClass({

  mixins: [Router.Navigation, require("mixins/auth-protected")],

  getInitialState: function() {
    return {
      contract: null
    };
  },

  componentDidMount: function() {
    var self = this;

    ContractDAO.getContract(self.props.params.contractid).done(function(contract){
      var newState = {contract: contract};
      contract.Tenants.forEach(function(tenant) {
        newState["tenant" + tenant.id + "plan"] = "monthly";
      });

      self.setState(newState);
    }, self.handleApiError);
  },

  render: function() {
    var self = this;

    if (this.state.contract === null) {
      return null;
    }

    var contract = this.state.contract;

    var title = "Setup payments for " + contract.Property.shortAddress + " - " + contract.year + "/" + (parseInt(contract.year) + 1);

    var paymentOptions = [{
      text: "Monthly", 
      id: "monthly"
    }, {
      text: "Quarterly",
      id: "quarterly"
    }, {
      text: "Annually",
      id: "annually"
    }].map(function(plan) {
      return (
        <option value={plan.id}>{plan.text}</option>
      );
    });

    var headers = ["Tenant", "Payment Plan"];
    var dataNames = ["name", "plan"];

    var data = this.state.contract.Tenants.map(function(tenant) {

      var stateId = "tenant" + tenant.id + "plan";

      var handleOptionChange = function(e) {
        var newState = {};
        newState[stateId] = e.target.value;
        self.setState(newState);
      };

      return {
        id: tenant.id,
        name: tenant.fullName,
        plan: (<select onChange={handleOptionChange} value={self.state["tenant" + tenant.id + "plan"]}>{paymentOptions}</select>)
      };
    });

    return (
      <Panel title={title}>
        <DataTable
          headers={headers}
          hideFooter={true}
          dataNames={dataNames}
          data={data} />
        <div className="button" onClick={this.handleSubmit}>Confirm</div>
      </Panel>
    );

  },

  handleSubmit: function() {
    var self = this;

    var data = self.state.contract.Tenants.map(function(tenant) {
      var stateId = "tenant" + tenant.id + "plan";

      return {
        id: tenant.id,
        plan: self.state[stateId]
      };
    });

    ContractDAO.createPayments(self.state.contract.id, {plans: data}).then(function(payments) {
      self.props.showNotification("Payments created", true);
      self.transitionTo('contract-browse', {year: self.state.contract.year});
    }, self.handleApiError);
  }

});

module.exports = SetupPayment;