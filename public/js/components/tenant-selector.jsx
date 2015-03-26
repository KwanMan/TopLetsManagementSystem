var React = require("react");

var _ = require("lodash");

var TenantDAO = require("dao/tenant");

var SkyLight = require("react-skylight");
var ListSelector = require("./list-selector.jsx");
var Panel = require("./panel.jsx");

var TenantSelector = React.createClass({

  getInitialState: function() {
    return {
      tenants: [],
      selectedTenant: null
    };
  },

  render: function() {
    var self = this;
    var supplementary = null;

    if (this.state.selectedTenant !== null) {
      
      var tenant = _.find(self.state.tenants, {id: self.state.selectedTenant});

      supplementary = (

        <Panel title="">
          <div className="form">
            <div className="form-row">
              <div className="label">Name:</div>
              <div className="field">{tenant.fullName}</div>
            </div>
            <div className="form-row">
              <div className="label">ID Number:</div>
              <div className="field">{tenant.idNumber}</div>
            </div>
            <div className="form-row">
              <div className="label">E-Mail:</div>
              <div className="field">{tenant.email}</div>
            </div>
            <div className="form-row">
              <div className="label">Contact Number:</div>
              <div className="field">{tenant.contactNumber}</div>
            </div>
            <div className="button" onClick={this.handleConfirm}>Confirm</div>
          </div>
        </Panel>
      );
      
    }

    return (
      <SkyLight ref="mainDialog" showOverlay={true}>
        <div className="tenant-selector-wrapper">
          <Panel title="Tenants">
            <ListSelector 
              rows={this.getTenants()}
              selectedRow={this.state.selectedTenant}
              onChange={this.handleTenantChange} />
          </Panel>
          {supplementary}
        </div>
      </SkyLight>
    );

  },

  getTenants: function() {
    var tenants = this.state.tenants.map(function(tenant) {
      return {
          text: tenant.fullName,
          id: tenant.id
        };
    });

    return tenants;
  },

  launch: function(excludedTenants) {
    // reload api data

    var self = this;

    TenantDAO.getAllTenants().done(function(tenants) {

      tenants = tenants.filter(function(tenant) {
        return !_.some(excludedTenants, {id: tenant.id});
      });

      self.setState({
        tenants: tenants,
        selectedTenant: null
      });

      self.refs.mainDialog.show();

    });
  },

  handleTenantChange: function(id) {
    this.setState({
      selectedTenant: id
    });
  },

  handleConfirm: function() {
    var self = this;

    self.props.onConfirm(_.find(self.state.tenants, {id: self.state.selectedTenant}));
    self.refs.mainDialog.hide();
  }
  
});

module.exports = TenantSelector;