var React = require("react");
var Router = require("react-router");
var _ = require("lodash");
var formatString = require("lib/format-string");

var SkyLight = require("react-skylight");
var ListSelector = require("./list-selector.jsx");
var Panel = require("./panel.jsx");

var PropertyDAO = require("dao/property");

var PropertySelector = React.createClass({

  mixins: [Router.Navigation, require("mixins/auth-protected")],

  getInitialState: function() {

    return {
      properties: [],
      selectedProperty: null
    };

  },

  render: function() {

    var supplementary = null;

    if (this.state.selectedProperty !== null) {

      var property = _.find(this.state.properties, {id: this.state.selectedProperty});

      supplementary = (
        <Panel title="">
          {"ID: " + property.id}
          {"Address: " + formatString.address(property)}
          <div className="button" onClick={this.handleConfirm}>Confirm</div>
        </Panel>
      );
    }

    return (
      <SkyLight ref="mainDialog" showOverlay={true}>

        <div className="property-selector-wrapper">
          <Panel title="Properties">
            <ListSelector 
              rows={this.getProperties()}
              selectedRow={this.state.selectedProperty}
              onChange={this.handlePropertyChange} />
          </Panel>

          {supplementary}
        </div>
        
      </SkyLight>
    );

  },

  getProperties: function() {

    return this.state.properties.map(function(property) {
      return {
          text: formatString.address(property),
          id: property.id
        };
    });

  },

  launch: function(excludedProperties) {

    // reload api data

    var self = this;

    PropertyDAO.getAllProperties().done(function(properties) {

      if (excludedProperties.length !== 0 ){
        properties = properties.filter(function(property) {
          return !_.some(excludedProperties, {id: property.id});
        });
      }

      self.setState(_.assign(self.getInitialState(), {properties: properties}));

      self.refs.mainDialog.show();

    }, function(err) {
      self.handleUnauthorisedAccess();
    });

    

  },

  handlePropertyChange: function(id) {

    var self = this;

    self.setState({
      selectedProperty: id
    });

  },

  handleConfirm: function() {

    var self = this;

    self.props.onConfirm(_.find(this.state.properties, {id: this.state.selectedProperty}));
    self.refs.mainDialog.hide();

  
  }

});

module.exports = PropertySelector;