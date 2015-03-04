var React = require("react");

var SkyLight = require("react-skylight");
var ListSelector = require("./list-selector.jsx");
var Panel = require("./panel.jsx");

var TenantDAO = require("../../dao/tenant");

var TenantSelector = React.createClass({

  getInitialState: function() {

    return {
      tenants: [],
      selectedTenant: null,
      tenant: null
    };

  },

  render: function() {

    return (
      <SkyLight ref="mainDialog" showOverlay={true}>
      <span className="button" onClick={this.handleConfirm}>Confirm</span>
        <Panel title="Tenants">
          <ListSelector 
            rows={this.getTenants()}
            selectedRow={this.state.selectedTenant}
            onChange={this.handleTenantChange} />
        </Panel>

        
      </SkyLight>
    );

  },

  getTenants: function() {

    var tenants = this.state.tenants.map(function(tenant) {
      return {
          text: tenant.forename + " " + tenant.surname,
          id: tenant.id
        };
    });

    tenants.unshift({
      text: "New",
      id: "new"
    });

    return tenants;

  },

  launch: function() {

    // reload api data

    var self = this;

    TenantDAO.getAllTenants().done(function(tenants) {

      self.setState({
        tenants: tenants,
        selectedTenant: null
      });

    });

    this.refs.mainDialog.show();

  },

  handleTenantChange: function(id) {

    var self = this;

    self.setState({
      selectedTenant: id
    });

  },

  handleConfirm: function() {

    var self = this;

    if (self.state.selectedTenant === "new") {

      TenantDAO.createTenant({

      }).then(function(tenant) {
        self.props.onConfirm(tenant);
        self.refs.mainDialog.hide();
      });

    } else {

      self.props.onConfirm(this.getSelectedTenantFromList());
      self.refs.mainDialog.hide();

    }

    

  },

  getSelectedTenantFromList: function(){

    var self = this;

    return self.state.tenants.filter(function(tenant) {
      return tenant.id === self.state.selectedTenant;
    })[0];
  }

});

module.exports = TenantSelector;