var React = require("react");

var DataTable = React.createClass({
  render: function() {
    var self = this;

    var headers = this.props.headers.map(function(header) {
      return (<th>{header}</th>);
    });

    var footers = this.props.footers.map(function(footer) {
      return (<td>{footer}</td>);
    });

    var rows = this.props.data.map(function(row) {
      var cells = self.props.dataNames.map(function(name) {
        return (<td>{row[name]}</td>);
      });
      return (<tr>{cells}</tr>);
    });

    return (
      <table className="data-table table-hover">
        <thead><tr>{headers}</tr></thead>
        <tbody>{rows}</tbody>
        <tfoot><tr>{footers}</tr></tfoot>
      </table>
    );
  }
});

module.exports = DataTable;