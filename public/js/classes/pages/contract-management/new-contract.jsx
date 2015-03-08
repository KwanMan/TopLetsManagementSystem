var React = require("react");
var Router = require("react-router");
var Panel = require("../../components/panel.jsx");
var TenantSelector = require("../../components/tenant-selector.jsx");

var PropertyDAO = require("../../../dao/property");

var NewContract = React.createClass({

  mixins: [Router.Navigation, require("../../mixins/auth-protected")],

  getInitialState: function() {

    return {
      tenants: [],
      property: null
    };

  },

  componentDidMount: function() {

    var self = this;

    PropertyDAO.getProperty(self.props.params.propertyid).done(function(property) {
      self.setState({
        property: property
      });
    }, function(err) {
      self.handleUnauthorisedAccess();
    });

  },

  render: function() {

    var property = this.state.property;

    var address = null;

    console.log(property);

    if (property !== null){

      address = property.number + " " + property.street + "(" + this.props.params.year + ")";

    }

    return (
      <div className="contract-new">
        <Panel title={address}>
          <div className="form paper">

            <div className="form-row">
              <span className="label">Start Date</span>
              <input className="field" type="text" />
            </div>

            <div className="form-row">
              <span className="label">End Date</span>
              <input className="field" type="text" />
            </div>

            <div className="form-row">
              <span className="label">Contact Number</span>
              <input className="field" type="text" />
            </div>

            <div className="form-row">
              <span className="label">Address</span>
              <input className="field" type="text" />
            </div>
          </div>
        </Panel>

        <Panel title="Tenants">
          <ul>
            {this.state.tenants.map(function(tenant) {
              return (<li>{tenant.forename + " " + tenant.surname }</li>);
            })}
          </ul>
          <div className="button" onClick={this.handleAddTenantButton}>Add tenant</div>
        </Panel>

        <TenantSelector ref="tenantSelector" onConfirm={this.handleTenantAdded} />
      </div>
    );
  },

  handleAddTenantButton: function() {
    this.refs.tenantSelector.launch(this.state.tenants);
  },

  handleTenantAdded: function(tenant) {
    var tenants = this.state.tenants.concat(tenant);

    this.setState({
      tenants: tenants
    });
  }

});

module.exports = NewContract;