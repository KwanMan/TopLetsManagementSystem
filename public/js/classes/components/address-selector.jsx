var React = require("react/addons");
var ListSelector = require("./list-selector.jsx");

var AddressSelector = React.createClass({
  getInitialState: function() {
    var selectedLandlord = this.props.landlords.filter(function(landlord) {
      return landlord.id === this.props.selectedLandlord;
    }.bind(this))[0];
    return {selectedLandlord: selectedLandlord};
  },

  render: function() {
    return (
      <div className="address-selector">
        <ListSelector
          title="Landlords"
          rows={this.props.landlords} 
          selectedRow={this.state.selectedLandlord.id} 
          onChange={this.handleLandlordChange} />
        <ListSelector
          title="Properties"
          rows={this.state.selectedLandlord.properties}
          selectedRow={this.state.selectedProperty}
          onChange={this.handlePropertyChange} />
      </div>
    );
  },
  
  handleLandlordChange: function(id) {
    console.log(id);
    var selectedLandlord = this.props.landlords.filter(function(landlord) {
      return landlord.id === id;
    }.bind(this))[0];
    console.log(selectedLandlord);
    this.setState({selectedLandlord: selectedLandlord});
  },

  handlePropertyChange: function(id) {
    var state = this.state;
    state.selectedProperty = id;
    this.setState(state);
  }
  
});

module.exports = AddressSelector;
