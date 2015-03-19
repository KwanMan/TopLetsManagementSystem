var React = require("react");
var Router = require("react-router");
var when = require("when");
var Panel = require("components/panel.jsx");
var ListSelector = require("components/list-selector.jsx");
var DataTable = require("components/data-table/data-table.jsx");
var formatString = require("lib/format-string");
var LandlordDAO = require("dao/landlord");
var PropertyDAO = require("dao/property");
var PropertyReportDAO = require("dao/property-report");

var _ = require("lodash");

var Browse = React.createClass({

  mixins: [Router.Navigation, require("mixins/auth-protected")],

  getInitialState: function() {

    return {
      months: [],
      selectedMonth: null,
      emptyProperties: [],
      presentProperties: []
    };

  },

  componentDidMount: function() {

    // TODO: These two dates should be loaded from db when we decide how to store it
    var start = {
      year: 2014,
      month: 7
    };

    var latest = {
      year: 2015,
      month: 5
    };  

    var rows = this.getMonthsList(start, latest);
    var selectedRow = null;

    this.setState({
      months: rows,
      selectedMonth: selectedRow
    });

  },

  getMonthsList: function(start, latest) {

    var output = [];

    var current = {
      year: latest.year,
      month: latest.month
    };

    var stop = {};
    if (start.month === 0) {
      stop.year = start.year - 1;
      stop.month = 11;
    } else {
      stop.year = start.year;
      stop.month = start.month - 1;
    }

    while (current.year !== stop.year || current.month !== stop.month) {

      var text = [formatString.monthShort(current.month), current.year].join(" ");
      var id = [current.year, ("0" + current.month).slice(-2)].join("-");
      output.push({
        text: text,
        id: id
      });

      if (current.month !== 0) {
        current.month--;
      } else {
        current.month = 11;
        current.year--;
      }
    }

    return output;



  },

  render: function() {

    var tablePanel = null;
    if (this.state.selectedMonth) {
      tablePanel = (
        <Panel className="table">
          {this.renderTable()}
        </Panel>
      );
    }

    return (
      <div className="report-browse">
        <Panel title="Date">
          <ListSelector
            rows={this.state.months}
            selectedRow={this.state.selectedMonth}
            onChange={this.handleDateChange} />
        </Panel>
        {tablePanel}
      </div>
    );
  
  },

  renderTable: function() {
    var self = this;

    var headers = ["Property", "Status", null];
    var dataNames = ["property", "status", "action"];

    var empty = self.state.emptyProperties.map(function(property) {
      return {
        id: property.id,
        property: formatString.addressShort(property),
        status: "Pending",
        action: "Create"
      };
    });

    var present = self.state.presentProperties.map(function(property) {
      return {
        id: property.id,
        property: formatString.addressShort(property),
        status: "Created",
        action: "View"
      };
    });

    var data = empty.concat(present);

    return (
      <DataTable
        headers={headers}
        hideFooter={true}
        dataNames={dataNames}
        data={data}
        onCol2Click={this.handleReportSelect}/>
      );


  },

  handleDateChange: function(id) {
    var self = this;

    var parts = id.split("-");
    var year = parts[0];
    var month = parts[1];

    var tasks = [];

    tasks.push(PropertyDAO.getAllProperties());
    tasks.push(PropertyReportDAO.getByDate(year, month));

    when.all(tasks).done(function(results) {
      var properties = results[0];
      var reports = results[1];

      var empty = [];
      var present = [];

      properties.forEach(function(property) {
        var matchingReports = reports.filter(function(report) {
          return report.property_id === property.id;
        });

        if (matchingReports.length === 1) {
          present.push(property);
        } else {
          empty.push(property);
        }
      });

      self.setState({
        selectedMonth:id,
        emptyProperties: empty,
        presentProperties: present
      });
    }, function(err) {
      self.handleUnauthorisedAccess();
    });
  },

  handleReportSelect: function(id) {

    var parts = this.state.selectedMonth.split("-");
    var year = parts[0];
    var month = parts[1];

    var inEmptyList = this.state.emptyProperties.filter(function(property) {
      return property.id === id;
    }).length === 1;

    if (inEmptyList) {
      //Go to new report
      this.transitionTo('new-property-report', {propertyid: id, year: year, month: month});
    } else {
      //Show existing report
      console.log("show report for " + id);
      console.log("month: " + this.state.selectedMonth);
    }

  }

});

module.exports = Browse;