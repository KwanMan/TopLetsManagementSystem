var React = require("react");
var Panel = require("../../components/panel.jsx");
var ListSelector = require("../../components/list-selector.jsx");

var _ = require("lodash");

var getContractsFromAPI = function() {
  return [

  {
    text: "Arianna Ramirez",
    id: "aramirez",
    properties: [{
      text: "69 Rydal Avenue",
      id: "69 Rydal Avenue",
      contracts:[{
          season: "2014/2015",
          startDate: "9th Sept 2014",
          endDate: "30th June 2015"
        }, {
          season: "2015/2016",
          startDate: "9th Sept 2015",
          endDate: "30th June 2016"
        }
      ]
    }, {
      text: "108 Paget Street",
      id: "108 Paget Street",
      contracts:[{
          season: "2014/2015",
          startDate: "9th Sept 2014",
          endDate: "30th June 2015"
        }, {
          season: "2015/2016",
          startDate: "9th Sept 2015",
          endDate: "30th June 2016"
        }
      ]
    }]
  }, 

  {
    text: "Sergio Davidson",
    id: "sdavidson",
    properties: [
    {text: "8315 W Alexander Rd", id: "8315 W Alexander Rd",
      contracts:[{
          season: "2014/2015",
          startDate: "9th Sept 2014",
          endDate: "30th June 2015"
        }
      ]},
      {text: "7966 Saddle Dr", id: "7966 Saddle Dr",
      contracts:[{
          season: "2014/2015",
          startDate: "9th Sept 2014",
          endDate: "30th June 2015"
        }
      ]}
    ]
  },

  {
    text: "Mattie Wheeler",
    id: "mwheeler",
    properties: [
      {text: "5634 Hogan St", id: "5634 Hogan St",
      contracts:[
        {
          season: "2014/2015",
          startDate: "9th Sept 2014",
          endDate: "30th June 2015"
        }
      ]},
      {text: "6462 Eason Rd", id: "6462 Eason Rd",
      contracts:[
        {
          season: "2015/2016",
          startDate: "9th Sept 2015",
          endDate: "30th June 2016"
        }, {
          season: "2014/2015",
          startDate: "9th Sept 2014",
          endDate: "30th June 2015"
        }
      ]}
    ]
  },

  {
    text: "Suzanne Burke",
    id: "sburke",
    properties: [
      {text: "2606 Walnut Hill Ln", id: "2606 Walnut Hill Ln",
      contracts:[
        {
          season: "2015/2016",
          startDate: "9th Sept 2015",
          endDate: "30th June 2016"
        }, {
          season: "2014/2015",
          startDate: "9th Sept 2014",
          endDate: "30th June 2015"
        }
      ]},
      {text: "6649 Cedar Dr", id: "6649 Cedar Dr",
      contracts:[
        {
          season: "2015/2016",
          startDate: "9th Sept 2015",
          endDate: "30th June 2016"
        }, {
          season: "2014/2015",
          startDate: "9th Sept 2014",
          endDate: "30th June 2015"
        }
      ]}
    ]
  },

  {
    text: "Harry Cole",
    id: "hcole",
    properties: [
      {text: "2419 Paddington Ct", id: "2419 Paddington Ct",
      contracts:[
        {
          season: "2015/2016",
          startDate: "9th Sept 2015",
          endDate: "30th June 2016"
        }, {
          season: "2014/2015",
          startDate: "9th Sept 2014",
          endDate: "30th June 2015"
        }
      ]},
      {text: "8247 Robinson Rd", id: "8247 Robinson Rd",
      contracts:[
        {
          season: "2015/2016",
          startDate: "9th Sept 2015",
          endDate: "30th June 2016"
        }, {
          season: "2014/2015",
          startDate: "9th Sept 2014",
          endDate: "30th June 2015"
        }
      ]}
    ]
  }];
};

var Browse = React.createClass({

  getInitialState: function() {
    return {
      landlords: [],
      occupied: "all",
      selectedSeason: null,
      selectedLandlord: null,
      selectedProperty: null
    };
  },

  componentDidMount: function() {

    this.setState({landlords: getContractsFromAPI()});

  },

  render: function() {

    var contractPanel = null;
    var contract = this.getContract();

    if (this.state.selectedProperty !== null) {

      if (contract !== null) {

        contractPanel = (
          <Panel title={this.state.selectedProperty}>
            <div>{"Start Date: " + contract.startDate}</div>
            <div>{"End Date: " + contract.endDate}</div>
          </Panel>
        );

      } else {

        contractPanel = (
          <Panel title={"New contract for " + this.state.selectedProperty}>
            <div className="form">

              <div className="form-row">
                <span className="label">Start Date</span>
                <input className="field" type="text" />
              </div>

              <div className="form-row">
                <span className="label">End Date</span>
                <input className="field" type="text" />
              </div>

              <div className="form-row">
                <span className="label">Tenant 1</span>
                <input className="field" type="text" />
              </div>

              <div className="form-row">
                <span className="label">Tenant 2</span>
                <input className="field" type="text" />
              </div>

            </div>
          </Panel>
        );
      }

    }


    return (
      <div className="contract-browse">

        <Panel title="Season">
          <select value={this.state.occupied} className="occupied-selector" onChange={this.handleOccupiedChange}>
            <option value="unoccupied">Unoccupied</option>
            <option value="occupied">Occupied</option>
            <option value="all">All</option>
          </select>
          <ListSelector
            className="season-selector"
            rows={this.getSeasons()} 
            selectedRow={this.state.selectedSeason}
            onChange={this.handleSeasonChange} />
        </Panel>

        <Panel title="Landlord">
          <ListSelector
            className="landlord-selector"
            rows={this.getLandlords()}
            selectedRow={this.state.selectedLandlord}
            onChange={this.handleLandlordChange} />
        </Panel>

        <Panel title="Properties">
          <ListSelector
            className="property-selector"
            rows={this.getProperties()}
            selectedRow={this.state.selectedProperty}
            onChange={this.handlePropertyChange} />
        </Panel>

        {contractPanel}

      </div>
    );

  },

  getSeasons: function() {

    if (this.state.landlords.length === 0){
      return [];
    }

    var seasons = _.uniq(this.flattenData(this.state.landlords).map(function(value) {
      return value.contract.season;
    }));

    return seasons.map(function(season) {
      return {
        text: season,
        id: season
      };
    });

  },

  getLandlords: function() {
    if (!this.state.selectedSeason){
      return [];
    }

    if (this.state.occupied === "all") {

      return this.state.landlords.map(function(landlord) {
        return _.omit(landlord, "properties");
      });

    } else if (this.state.occupied === "occupied") {

      return this.flattenData(this.state.landlords).filter(function(value) {
        return value.contract.season == this.state.selectedSeason;
      }.bind(this)).map(function(value) {
        return value.landlord;
      });

    } else if (this.state.occupied === "unoccupied") {

      // All landlords which have an unoccupied property for current season
      return this.state.landlords.filter(function(landlord) {

        // Is there a property with no contract for current season?
        var propertiesWithNoContract = landlord.properties.filter(function(property) {

          // True if no contracts matching current season
          var contractsForCurrentSeason = property.contracts.filter(function(contract) {
            return contract.season === this.state.selectedSeason;
          }.bind(this));

          return contractsForCurrentSeason.length === 0;

        }.bind(this));

        return propertiesWithNoContract.length > 0;

      }.bind(this));


    }
  },

  getProperties: function() {
    if (!this.state.selectedLandlord){
      return [];
    }

    var properties = this.state.landlords.filter(function(landlord) {
        return landlord.id == this.state.selectedLandlord;
      }.bind(this))[0].properties;

    if (this.state.occupied === "all") {
      return properties.map(function(property) {
        return _.omit(property, "contracts");
      });
    } else if (this.state.occupied === "occupied") {

      return properties.filter(function(property) {
        return property.contracts.filter(function(contract) {
          return contract.season === this.state.selectedSeason;
        }.bind(this)).length === 1;
      }.bind(this));

    } else if (this.state.occupied === "unoccupied") {
      
      return properties.filter(function(property) {
        return property.contracts.filter(function(contract) {
          return contract.season === this.state.selectedSeason;
        }.bind(this)).length === 0;
      }.bind(this));

    }
  },

  getContract: function() {

    if (this.state.selectedProperty === null) {
      return null;
    }

    var matchingContracts = this.flattenData(this.state.landlords).filter(function(v) {
      return v.property.id === this.state.selectedProperty && v.contract.season === this.state.selectedSeason;
    }.bind(this));

    if (matchingContracts.length === 0 ) {
      return null;
    }

    return matchingContracts[0].contract;

  },

  handleOccupiedChange: function(e) {
    this.setState({occupied: e.target.value});
  },

  handleSeasonChange: function(id) {
    this.setState({
      selectedSeason: id,
      selectedLandlord: null,
      selectedProperty: null
    });
  },

  handleLandlordChange: function(id) {
    this.setState({
      selectedLandlord: id,
      selectedProperty: null
    });

  },

  handlePropertyChange: function(id) {
    this.setState({
      selectedProperty: id
    });
  },

  flattenData: function(data) {
    var flattened = data.map(function(landlord) {

      return landlord.properties.map(function(property) {


        return property.contracts.map(function(contract) {

          return {
            landlord: _.omit(landlord, "properties"),
            property: _.omit(property, "contracts"),
            contract: contract,
            };

        });

      });

    });

    return _.flattenDeep(flattened);
  }

});

module.exports = Browse;