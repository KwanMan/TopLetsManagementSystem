var moment = require("moment");

module.exports = {
  getCurrentYear: function() {
    var currentDate = moment();

    var latestYear;

    // if past july or later
    if (currentDate.month() >= 6) {
      return currentDate.year();
    } else {
      return currentDate.year() - 1;
    }
  },

  getNavItems: function() {

    var startYear = 2012;
    var endYear = this.getCurrentYear() + 1;

    var contractManagementChildren = [];

    for (var year = endYear; year >= startYear; year--) {
      contractManagementChildren.push({
        text: year,
        route: "contract-management",
        params: {
          year: year
        }
      });
    }

    var navLinks = [{
      text: "Dashboard",
      route: "dashboard"
    },{
      text: "Property Management",
      route: "property-management",
      children: [{
        text: "New Property",
        route: "new-property"
      }]
    }, {
      text: "Contract Management",
      route: "contract-management",
      children: contractManagementChildren
    }, {
      text: "Rent Payment",
      route: "rent-payment"
    }, {
      text: "Report Management",
      route: "report-management"
    }, {
      text: "Settings",
      route: "settings"
    }];

    return navLinks;
  }
};