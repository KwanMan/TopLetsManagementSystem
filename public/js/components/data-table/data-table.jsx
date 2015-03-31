var React = require("react");

var _ = require("lodash");

var DataTable = React.createClass({

  mixins: [require("mixins/classable")],

  getInitialState: function() {
    return {
      searchTerm: ""
    };
  },

  render: function() {
    var self = this;

    var head = null;
    var foot = null;

    var searchBar = null;
    if (this.props.searchCols) {
      searchBar = (<input className="search-bar" type="text" value={this.state.searchTerm} onChange={this.handleSearchTermChange} />);
    }

    // Make header
    if (!this.props.hideHeader) {
      var headers = this.props.headers.map(function(header, index) {
        return (<th className={"col" + index}>{header}</th>);
      });
      head = (<thead><tr>{headers}</tr></thead>);
    }

    // Make footer
    if (!this.props.hideFooter) {
      var footers = this.props.footers.map(function(footer, index) {
        return (<td className={"col" + index}>{footer}</td>);
      });
      foot = (<tfoot><tr>{footers}</tr></tfoot>);
    }

    var data = this.props.data;

    // Perform search if required
    if (self.props.searchCols && self.state.searchTerm !== "") {
      data = data.filter(function(row) {
        return _.some(self.props.searchCols, function(col) {
          return self.matchText(self.state.searchTerm, row[col]);
        });
      });
    }

    // Make body
    var rows = data.map(function(row) {
      var cells = self.props.dataNames.map(function(name, index) {
        return (<td className={"col" + index}>{row[name]}</td>);
      });
      return (<tr>{cells}</tr>);
    });

    var classes = this.getClasses(["data-table", "table-hover"]);

    return (
      <div className="data-table-wrapper">
        {searchBar}
        <table className={classes}>
          {head}
          <tbody>{rows}</tbody>
          {foot}
        </table>
      </div>
    );
  },

  handleSearchTermChange: function(e){
    this.setState({
      searchTerm: e.target.value
    });
  },

  matchText: function(searchTerm, text) {
    return text.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
  }
  
});

module.exports = DataTable;