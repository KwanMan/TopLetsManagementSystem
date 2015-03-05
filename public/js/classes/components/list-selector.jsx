var React = require("react/addons");
var cx = React.addons.classSet;

var Row = React.createClass({
  render: function() {
    return <div className="list-selector-row" onClick={this.props.onSelect}>{this.props.text}</div>;
  }
});

var SelectedRow = React.createClass({
  render: function() {
    return <div className="selected-row">{this.props.name}</div>;
  }
});

var ListSelector = React.createClass({
  getInitialState: function() {

    return {
      searchTerm: ""
    };
  },

  componentWillReceiveProps: function() {

    this.setState({
      searchTerm: ""
    });
  },

  onChange: function(id) {
    this.props.onChange(id);
    this.setState({
      searchTerm: ""
    });
  },
  
  render: function() {

    var self = this;

    var selectedRow = null;
    var rows = [];

    this.props.rows.forEach(function(row) {
      if (row.id === self.props.selectedRow) {
        selectedRow = (<SelectedRow name={row.text} />);
      } else {
        rows.push(row);
      }
    });

    if (self.state.searchTerm !== "") {
      rows = rows.filter(function(row) {
        return row.text.toLowerCase().indexOf(self.state.searchTerm) !== -1;
      });
    }

    rows = rows.map(function(row) {

      return (
        <Row 
          text={row.text}
          key={row.id}
          onSelect={self.onChange.bind(self.onChange, row.id) } />
      );

    });

    var classes = "list-selector " + this.props.className;

    return (
      <div className={classes}>
      <input className="search-bar" type="text" value={this.state.searchTerm} onChange={this.handleSearchTermChange} />
        {selectedRow}
        <div className="list-selector-list">
          {rows}
        </div>
      </div>
    );
  },

  handleSearchTermChange: function(e){
    console.log(e.target.value);
    this.setState({
      searchTerm: e.target.value
    });
  }
});

module.exports = ListSelector;