var React = require("react");
var Router = require("react-router");

var moment = require("moment");
var formatString = require("lib/format-string");
var auth = require("lib/auth");

var PropertyReportDAO = require("dao/property-report");

var DataTable = require("components/data-table/data-table.jsx");
var Panel = require("components/panel.jsx");

var ViewReport = React.createClass({

  mixins: [Router.Navigation, require("mixins/auth-protected")],

  getInitialState: function() {
    return {
      report: null
    };
  },

  componentDidMount: function() {
    var self = this;

    PropertyReportDAO.getReport(self.props.params.id).done(function(report){
      self.setState({report: report});
    }, function(err) {
      self.handleUnauthorisedAccess();
    });
  },

  getSubtotal: function(payments) {
    return payments.reduce(function(prev, cur) {
      return prev + cur.amount;
    }, 0);
  },



  render: function() {

    if (this.state.report === null) {
      return null;
    }
    
    var heading = null;

    if (this.state.report !== null) {
      heading = this.state.report.Property.longAddress + " - " + formatString.month(this.state.report.month) + " " + this.state.report.year;
    }

    return (
      <div className="report-new">
        <Panel title={heading}>
          {this.renderRentPayments()}
          <h2>Receipts</h2>
          {this.renderReceipts()}
          <h2>Fees</h2>
          {this.renderFees()}
          <h2>Totals</h2>
          {this.renderTotals()}
          <div onClick={this.handleSubmit} className="button">Submit</div>
        </Panel>
      </div>
    );
  },

  renderRentPayments: function() {
    var self = this;

    var headers = ["Date", "Tenant", "Amount"];

    var dataNames = ["date", "tenant", "amount"];
    var data = this.state.report.RentPayments.map(function(rentPayment) {
      return {
        id: rentPayment.id,
        date: formatString.date(rentPayment.dueDate),
        tenant: rentPayment.Tenant.fullName,
        amount: formatString.currency(rentPayment.amount)
      };
    });

    var subtotal = this.getSubtotal(this.state.report.RentPayments);

    var footers = [null, "Subtotal:", formatString.currency(subtotal)];

    return (
      <DataTable
        className="rent-table"
        headers={headers}
        footers={footers}
        dataNames={dataNames}
        data={data} />
    );
  },

  renderReceipts: function() {
    var self = this;

    var headers = ["Date", "Payee", "Amount", ""];

    var dataNames = ["date", "payee", "amount", "view"];
    var data = this.state.report.Receipts.map(function(receipt) {
      return {
        id: receipt.id,
        date: formatString.date(receipt.date),
        payee: receipt.payee,
        amount: formatString.currency(receipt.amount),
        view: receipt.filename === null ? null : (<a href={auth.getAssetUrl(receipt.filename)}>View</a>)
      };
    });

    var subtotal = this.getSubtotal(this.state.report.Receipts);
    var footers = [null, "Subtotal:", formatString.currency(subtotal), null];

    return (
      <DataTable
        className="receipt-table"
        headers={headers}
        footers={footers}
        dataNames={dataNames}
        data={data} />
    );
  },

  renderFees: function() {
    var headers = ["Note", "Amount"];
    var dataNames = ["note", "amount"];
    var data = this.state.report.Fees.map(function(fee) {
      return {
        id: fee.id,
        note: fee.note,
        amount: formatString.currency(fee.amount)
      };
    });

    var subtotal = this.getSubtotal(this.state.report.Fees);
    var footers = ["Subtotal:", formatString.currency(subtotal)];

    return (
      <DataTable
        className="fee-table"
        headers={headers}
        dataNames={dataNames}
        data={data}
        footers={footers} />
    );
    
  },

  renderTotals: function() {
    var self = this;

    var totals = [{
      section: "Rent Payments",
      amount: self.getSubtotal(self.state.report.RentPayments)
    }, {
      section: "Maintenance",
      amount: self.getSubtotal(self.state.report.Receipts) * -1
    }, {
      section: "Fees",
      amount: self.getSubtotal(self.state.report.Fees) * -1   
    }];

    var dataNames = ["section", "amount"];
    var data = totals.map(function(total) {
      return {
        section: total.section,
        amount: formatString.currency(total.amount)
      };
    });

    var subtotal = this.getSubtotal(totals);
    var footers = ["Total:", formatString.currency(subtotal)];

    return (
      <DataTable
        className="total-table"
        hideHeader={true}
        dataNames={dataNames}
        data={data}
        footers={footers} />
    );
  },

});

module.exports = ViewReport;