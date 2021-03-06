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
        route: "contract-browse",
        params: {
          year: year
        }
      });
    }

    contractManagementChildren.unshift({
      text: "New Tenant",
      route: "new-tenant"
    });

    var navLinks = [{
      text: "Property Management",
      route: "property-management",
      children: [{
        text: "Browse",
        route: "property-browse"
      }, {
        text: "New Landlord",
        route: "landlord-new"
      }, {
        text: "New Property",
        route: "property-new"
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
      route: "report-management",
      children: [{
        text: "Browse",
        route: "report-browse"
      }, {
        text: "New Receipt",
        route: "receipt-new"
      }]
    }];

    return navLinks;
  }
};