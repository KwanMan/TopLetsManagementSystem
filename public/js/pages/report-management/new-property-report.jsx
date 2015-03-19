var React = require("react");
var Router = require("react-router");
var when = require("when");
var formatString = require("lib/format-string");
var _ = require("lodash");

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
      fees: [],
      property: null
    };

  },

  componentDidMount: function() {

    var self = this;

    var tasks = [];

    tasks.push(PropertyDAO.getProperty(this.props.params.propertyid));
    tasks.push(PropertyDAO.getNewRentPayments(this.props.params.propertyid));
    tasks.push(PropertyDAO.getNewReceipts(this.props.params.propertyid));

    when.all(tasks).done(function(results) {

      var property = results[0];

      var rentPayments = results[1].filter(function(rentPayment) {
        return rentPayment.paid;
      });
      var receipts = results[2];

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

    var heading = null;

    if (this.state.property !== null) {
      heading = formatString.address(this.state.property) + " - " + formatString.month(this.props.params.month) + " " + this.props.params.year;
    }

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
            {this.renderFees()}
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
        data={data}
        onCol3Click={self.handleRentRemove} />
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
        data={data}
        onCol3Click={self.handleReceiptRemove} />
    );
  },

  renderFees: function() {

    var fees = this.getFees();
    
    var headers = ["Note", "Amount"];
    var dataNames = ["note", "amount"];

    var data = fees.map(function(fee, index) {
      return _.assign(fee, {id: index});
    });

    var subtotal = fees.reduce(function(prev, cur) {
      return prev + cur.amount;
    }, 0);

    var footers = [null, formatString.currency(subtotal)];

    return (
      <DataTable
        className="data-table table-hover"
        headers={headers}
        dataNames={dataNames}
        data={data}
        footers={footers} />

    );
    
  },

  getFees: function() {
    var rentTotal = this.state.rentPayments.reduce(function(prev, cur) {
      return prev + cur.amount;
    }, 0);

    return [{
      note: "Commission",
      amount: rentTotal * 0.11
    }];


  },

  handleRentRemove: function(id){

    var self = this;
    var newPayments = self.state.rentPayments.filter(function(rentPayment) {
      return rentPayment.id !== id;
    });
    this.setState({
      rentPayments: newPayments
    });
  },

  handleReceiptRemove: function(id){

    var self = this;
    var newReceipts = self.state.receipts.filter(function(receipt) {
      return receipt.id !== id;
    });
    this.setState({
      receipts: newReceipts
    });
  },

  handleSubmit: function() {

    var self = this;

    var data = {};

    data.year = 2015;
    data.month = 4;

    data.rentPayments = self.state.rentPayments.map(function(payment) {
      return payment.id;
    });

    data.receipts = self.state.receipts.map(function(receipt) {
      return receipt.id;
    });

    data.fees = this.getFees();

    PropertyDAO.createReport(self.props.params.propertyid, data).done(function(report) {
      console.log(report);
      self.transitionTo("dashboard", {id: report.id});
    }, function(err) {
      self.handleUnauthorisedAccess();
    });
  }
});