var React = require("react");

var DataTable = React.createClass({

  mixins: [require("mixins/classable")],

  render: function() {
    var self = this;

    var head = null;
    var foot = null;

    // Make header
    if (!this.props.hideHeader) {
      var headers = this.props.headers.map(function(header) {
        return (<th>{header}</th>);
      });
      head = (<thead><tr>{headers}</tr></thead>);
    }

    // Make footer
    if (!this.props.hideFooter) {
      var footers = this.props.footers.map(function(footer, index) {
        var actionId = 'onFootCol' + index + 'Click';

        if (self.props[actionId]) {
          return (<td><span onClick={self.props[actionId]} className="action">{footer}</span></td>);
        }
        return (<td>{footer}</td>);
      });
      foot = (<tfoot><tr>{footers}</tr></tfoot>);
    }

    // Make body
    var rows = this.props.data.map(function(row) {
      var cells = self.props.dataNames.map(function(name, index) {

        var actionId = 'onCol' + index + 'Click';
        if (self.props[actionId]){
          var action = self.props[actionId].bind(null, row.id);
          return (<td><span className="action" onClick={action}>{row[name]}</span></td>);
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