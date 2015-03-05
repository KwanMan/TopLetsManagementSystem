var React = require("react");
var _ = require("lodash");

var SkyLight = require("react-skylight");
var ListSelector = require("./list-selector.jsx");
var Panel = require("./panel.jsx");

var TenantDAO = require("../../dao/tenant");

var TenantSelector = React.createClass({

  getInitialState: function() {

    return {
      tenants: [],
      selectedTenant: null,
      newTenant: {
        forename: "",
        surname: "",
        id: ""
      }
    };

  },

  render: function() {

    var supplementary = null;

    if (this.state.selectedTenant !== null) {
      if(this.state.selectedTenant === "new") {

        supplementary = (

          <Panel title="">

            <div className="form paper">

              <div className="form-row">
                <span className="label">Forename</span>
                <input className="field" type="text" value={this.state.newTenant.forename} onChange={this.handleForenameChange} />
              </div>

              <div className="form-row">
                <span className="label">Surname</span>
                <input className="field" type="text" value={this.state.newTenant.surname} onChange={this.handleSurnameChange} />
              </div>

              <div className="form-row">
                <span className="label">ID No.</span>
                <input className="field" type="text" value={this.state.newTenant.id} onChange={this.handleIDChange} />
              </div>

              <div className="button" onClick={this.handleCreate}>Confirm</div>

            </div>
          </Panel>

        );

      } else {

        var tenant = this.getSelectedTenantFromList();

        supplementary = (

          <Panel title="">
            {"ID: " + tenant.id}
            <div className="button" onClick={this.handleConfirm}>Confirm</div>
          </Panel>

        );

      }
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

  launch: function(excludedTenants) {

    // reload api data

    var self = this;

    TenantDAO.getAllTenants().done(function(tenants) {

      tenants = tenants.filter(function(tenant) {
        var matching = excludedTenants.filter(function(v) {
          return v.id === tenant.id;
        });

        return matching.length === 0;
      });

      self.setState(_.assign(self.getInitialState(), {tenants: tenants}));

      self.refs.mainDialog.show();

    });

    

  },

  handleTenantChange: function(id) {

    var self = this;

    self.setState({
      selectedTenant: id
    });

  },

  handleForenameChange: function(e) {

    var newTenant = this.state.newTenant;
    newTenant.forename = e.target.value;

    this.setState({
      newTenant: newTenant
    });
  },

  handleSurnameChange: function(e) {

    var newTenant = this.state.newTenant;
    newTenant.surname = e.target.value;

    this.setState({
      newTenant: newTenant
    });
  },

  handleIDChange: function(e) {

    var newTenant = this.state.newTenant;
    newTenant.id = e.target.value;

    this.setState({
      newTenant: newTenant
    });
  },

  handleCreate: function() {

    var self = this;

    TenantDAO.createTenant(_.omit(self.state.newTenant, "id")).then(function(tenant) {
      self.props.onConfirm(tenant);
      self.refs.mainDialog.hide();
    });

  },

  handleConfirm: function() {

    var self = this;

    if (self.state.selectedTenant === "new") {

      

    } else {

      self.props.onConfirm(this.getSelectedTenantFromList());
      self.refs.mainDialog.hide();

    }
  },

  getSelectedTenantFromList: function(){

    var self = this;

    var idx = _.findIndex(self.state.tenants, 'id', self.state.selectedTenant);

    if (idx !== -1) {
      return self.state.tenants[idx];
    }
    return null;
  }

});

module.exports = TenantSelector;