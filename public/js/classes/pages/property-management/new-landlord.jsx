var React = require("react");
var Router = require("react-router");
var Panel = require("../../components/panel.jsx");

var NewLandlord = React.createClass({

  mixins: [Router.Navigation, require("../../mixins/auth-protected")],

  render: function() {
    return (
      <Panel title="New Landlord">
        <div className="form">

          <div className="form-row">
            <span className="label">Name</span>
            <input className="field" type="text" />
          </div>

          <div className="form-row">
            <span className="label">E-mail</span>
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
    );
  }

});

module.exports = NewLandlord;