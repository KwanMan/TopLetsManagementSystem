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
      console.log(contract);
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

    var title = contract.year + " contract for " + formatString.address(contract.Property);

    return (
      <Panel className="contract-view" title={title}>
        <div>{"Start Date: " + formatString.date(contract.startDate)}</div>
        <div>{"End Date: " + formatString.date(contract.endDate)}</div>
        <div>{"Price pppw: " + formatString.currency(contract.perWeek)}</div>
        
      </Panel>
    );
  }

});

module.exports = ViewContract;