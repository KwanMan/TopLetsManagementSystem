var React = require("react");
var Router = require("react-router");
var Panel = require("../../components/panel.jsx");
var LandlordSelector = require("../../components/landlord-selector.jsx");

var NewProperty = React.createClass({

  mixins: [Router.Navigation, require("../../mixins/auth-protected")],

  getInitialState: function() {
    return {landlord: null};
  },

  render: function() {

    var landlordOpt;

    if (this.state.landlord === null){
      landlordOpt = (<div className="button" onClick={this.handleChooseLandlordButton}>Select Landlord</div>);
    } else {
      landlordOpt = (<span>{"Landlord: " + this.state.landlord.forename + " " + this.state.landlord.surname}</span>);
    }

    return (
      <div className="property-new">
        <Panel title="New Property">
          <div className="form">

            {landlordOpt}

            <div className="form-row">
              <span className="label">Name</span>
              <input className="field" type="text" />
            </div>

            <div className="form-row">
              <span className="label">Number</span>
              <input className="field" type="text" />
            </div>

            <div className="form-row">
              <span className="label">Street</span>
              <input className="field" type="text" />
            </div>

            <div className="form-row">
              <span className="label">Post Code</span>
              <input className="field" type="text" />
            </div>

          </div>
        </Panel>

        <LandlordSelector ref="landlordSelector" onConfirm={this.handleLandlordSelected} />

      </div>
    );
  } ,

  handleChooseLandlordButton: function() {
    this.refs.landlordSelector.launch([]);
  },

  handleLandlordSelected: function(landlord) {

    this.setState({landlord: landlord});
  }

});

module.exports = NewProperty;