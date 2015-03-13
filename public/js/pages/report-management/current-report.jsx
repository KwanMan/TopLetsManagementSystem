var React = require("react");
var Router = require("react-router");
var when = require("when");
var formatString = require("lib/format-string");

var PropertyDAO = require("dao/property");
var Panel = require("components/panel.jsx");
var DataTable = require("components/data-table/data-table.jsx");
var PageHeading = require("components/page-heading.jsx");

module.exports = React.createClass({

  mixins: [Router.State, Router.Navigation, require("mixins/auth-protected")],

  getInitialState: function() {

    return {
      rentPayments: [],
      receipts: [],
      property: null
    };

  },

  componentDidMount: function() {

    var self = this;

    var tasks = [];

    tasks.push(PropertyDAO.getNewRentPayments(this.props.params.id));
    tasks.push(PropertyDAO.getNewReceipts(this.props.params.id));
    tasks.push(PropertyDAO.getProperty(this.props.params.id));

    when.all(tasks).done(function(results) {
      var rentPayments = results[0].filter(function(rentPayment) {
        return rentPayment.paid;
      });
      var receipts = results[1];
      var property = results[2];

      self.setState({
        rentPayments: rentPayments,
        receipts: receipts,
        property: property
      });
    }, function(err) {
      self.handleUnauthorisedAccess();
    });

  },

  render: function() {

    var heading = this.state.property === null ? "" : formatString.address(this.state.property);

    return (
      <div>
        <PageHeading title={heading} />

        <div className="report-preview">
          <Panel title="Rent">
            {this.renderRentPayments()}
          </Panel>
          <Panel title="Maintenance">
            {this.renderReceipts()}
          </Panel>
          <Panel title="Fees">
            <div className="fees"></div>
          </Panel>
          <div onClick={this.handleSubmit} className="button">SUBMITT</div>
        </div>
      </div>
    );
  },

  renderRentPayments: function() {
    var self = this;

    var headers = ["Date", "Tenant", "Amount", ""];

    var dataNames = ["date", "tenant", "amount", "remove"];
    var data = this.state.rentPayments.map(function(rentPayment) {
      return {
        id: rentPayment.id,
        date: formatString.date(rentPayment.dueDate),
        tenant: formatString.name(rentPayment.Tenant),
        amount: formatString.currency(rentPayment.amount),
        remove: "remove"
      };
    });

    var subtotal = this.state.rentPayments.reduce(function(prev, cur) {
      return prev + cur.amount;
    }, 0);

    var footers = [null, null, formatString.currency(subtotal), null];

    return (
      <DataTable
        className="data-table table-hover"
        headers={headers}
        footers={footers}
        dataNames={dataNames}
        data={data} />
    );
  },

  renderReceipts: function() {

    var self = this;

    var headers = ["Date", "Payee", "Amount", ""];

    var dataNames = ["date", "payee", "amount", "remove"];
    var data = this.state.receipts.map(function(receipt) {
      return {
        id: receipt.id,
        date: formatString.date(receipt.date),
        payee: receipt.payee,
        amount: formatString.currency(receipt.amount),
        remove: "remove"
      };
    });

    var subtotal = this.state.receipts.reduce(function(prev, cur) {
      return prev + cur.amount;
    }, 0);

    var footers = [null, null, formatString.currency(subtotal), null];

    return (
      <DataTable
        className="data-table table-hover"
        headers={headers}
        footers={footers}
        dataNames={dataNames}
        data={data} />
    );
  },

  handleRemove: function(id){

    var self = this;
    var newPayments = self.state.rentPayments.filter(function(rentPayment) {
      return rentPayment.id !== id;
    });
    this.setState({
      rentPayments: newPayments
    });
  },

  handleSubmit: function() {

    var self = this;

    var data = {};

    data.date = self.state.date;

    data.rentPayments = self.state.rentPayments.map(function(payment) {
      return payment.id;
    });

    data.receipts = self.state.receipts.map(function(receipt) {
      return receipt.id;
    });

    PropertyDAO.createReport(self.props.params.id, data).done(function(report) {
      console.log(report);
      self.transitionTo("dashboard", {id: report.id});
    }, function(err) {
      self.handleUnauthorisedAccess();
    });
  }
});