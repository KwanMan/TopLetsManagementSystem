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

  render: function() {
    var self = this;
    var report = this.state.report;

    if (report === null) {
      return null;
    }

    var date = formatString.month(report.month) + " " + report.year;

    var title = date + " report for " + report.Property.longAddress;

    var receipts = report.Receipts.map(function(receipt) {
      return (<div>{receipt.payee + " - " + formatString.currency(receipt.amount)}<img src={auth.getAssetUrl(receipt.filename)} /></div>);
    });

    var payments = report.RentPayments.map(function(payment) {
      return (<div>{formatString.name(payment.Tenant) + " - " + formatString.currency(payment.amount)}</div>);
    });

    return (
      <Panel className="contract-view" title={title}>
        <div>{"Property: " + formatString.address(report.Property)}</div>
        {receipts}
        {payments}
      </Panel>
    );
  }

});

module.exports = ViewReport;