var React = require("react");

var DataTable = React.createClass({

  mixins: [require("mixins/classable")],

  render: function() {
    var self = this;

    var head = null;
    var foot = null;

    if (!this.props.hideHeader) {
      var headers = this.props.headers.map(function(header) {
        return (<th>{header}</th>);
      });
      head = (<thead><tr>{headers}</tr></thead>);
    }

    if (!this.props.hideFooter) {
      var footers = this.props.footers.map(function(footer) {
        return (<td>{footer}</td>);
      });
      foot = (<tfoot><tr>{footers}</tr></tfoot>);
    }

    var rows = this.props.data.map(function(row) {
      var cells = self.props.dataNames.map(function(name, index) {
        if (self.props['onCol' + index + 'Click']){
          return (<td className="clickable" onClick={self.props['onCol' + index + 'Click'].bind(null, row.id)}>{row[name]}</td>);
        }
        return (<td>{row[name]}</td>);
      });
      return (<tr>{cells}</tr>);
    });

    var classes = this.getClasses(["data-table", "table-hover"]);

    return (
      <table className={classes}>
        {head}
        <tbody>{rows}</tbody>
        {foot}
      </table>
    );
  }
});

module.exports = DataTable;