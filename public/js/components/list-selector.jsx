var React = require("react/addons");

var cx = React.addons.classSet;

var Row = React.createClass({

  mixins: [require("mixins/classable")],

  render: function() {
    var classes = this.getClasses("list-selector-row");
    return <div className={classes} onClick={this.props.onSelect}>{this.props.text}</div>;
  }
});

var SelectedRow = React.createClass({
  render: function() {
    return <div className="selected-row">{this.props.name}</div>;
  }
});

var ListSelector = React.createClass({

  mixins: [require('mixins/classable')],

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

  handleItemClicked: function(id) {
    this.props.onChange(id);
    this.setState({
      searchTerm: ""
    });
  },
  
  render: function() {

    var self = this;

    var selectedRow = null;
    var rows = [];

    var searchEnabled = self.state.searchTerm !== "";

    this.props.rows.forEach(function(row) {
      var rowSelected = row.id === self.props.selectedRow;
      if (rowSelected) {
        selectedRow = (<SelectedRow name={row.text} />);
      }

      // Only add to list if search is not enabled or the search matches
      if (!searchEnabled || self.matchText(self.state.searchTerm, row.text)) {
        rows.push(
          <Row 
            className={rowSelected ? "selected" : null}
            text={row.text}
            key={row.id}
            onSelect={self.handleItemClicked.bind(null, row.id)} />
        );          
      }
    });

    var searchBar = null;
    if (!this.props.hideSearch) {
      searchBar = (<input className="search-bar" type="text" value={this.state.searchTerm} onChange={this.handleSearchTermChange} />);
    }

    var classes = this.getClasses("list-selector");

    return (
      <div className={classes}>
        {searchBar}
        {selectedRow}
        <div className="list-selector-list">
          {rows}
        </div>
      </div>
    );
  },

  handleSearchTermChange: function(e){
    this.setState({
      searchTerm: e.target.value
    });
  },

  matchText: function(searchTerm, text) {
    return text.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
  }
  
});

module.exports = ListSelector;