var React = require("react/addons");
var cx = React.addons.classSet;

var Row = React.createClass({
  render: function() {
    return <div className="list-selector-row" onClick={this.props.onSelect}>{this.props.text}</div>
  }
});

var SelectedRow = React.createClass({
  render: function() {
    return <div className="selected-row">{this.props.name}</div>
  }
});

var ListSelector = React.createClass({
  onChange: function(id) {
    console.log(id + " clicked");
    this.props.onChange(id);
  },
  
  render: function() {

    var selectedRow = null;
    var rows = [];

    this.props.rows.forEach(function(row) {
      if (row.id === this.props.selectedRow) {
        selectedRow = (<SelectedRow name={row.text} />);
      } else {
        rows.push(
          <Row 
            text={row.text} 
            id={row.id}
            key={row.id}
            onSelect={this.onChange.bind(this, row.id) } />
        );
      }
    }.bind(this));

    return (
      <div className="list-selector">
        <div className="list-heading">{this.props.title}</div>
        {selectedRow}
        <div className="list-selector-list">
          {rows}
        </div>
      </div>
    );
  }
});

/**
  * title
  * rows
  * selectedRow
  * onSelectedChange
  */ 

module.exports = ListSelector;