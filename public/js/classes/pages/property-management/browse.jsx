var React  = require("react");

var AddressSelector = require("../../components/address-selector.jsx");

var LANDLORDS = [{
  text: "Arianna Ramirez",
  id: "aramirez",
  properties: [
    {text: "69 Rydal Avenue", id: "69 Rydal Avenue"},
    {text: "108 Paget Street", id: "108 Paget Street"}
  ]
}, {
  text: "Sergio Davidson",
  id: "sdavidson",
  properties: [
    {text: "10 Brook Road", id: "10 Brook Road"},
    {text: "99 Rudolph Boulevard", id: "99 Rudolph Boulevard"}
  ]
}, {
  text: "Mattie Wheeler",
  id: "mwheeler",
  properties: [
    {text: "576 Hippie Corner", id: "576 Hippie Corner"},
    {text: "77 Feet Road", id: "77 Feet Road"}
  ]
}, {
  text: "Suzanne Burke",
  id: "sburke",
  properties: [
    {text: "24 His Street", id: "24 His Street"},
    {text: "997 Another Name", id: "997 Another Name"}
  ]
}, {
  text: "Harry Cole",
  id: "hcole",
  properties: [
    {text: "2419 Paddington Ct", id: "2419 Paddington Ct"},
    {text: "8247 Robinson Rd", id: "8247 Robinson Rd"}
  ]
}, {
  text: "Penny Perry",
  id: "pperry",
  properties: [
    {text: "6803 Adams St", id: "6803 Adams St"},
    {text: "2806 Lone Wolf Trail", id: "2806 Lone Wolf Trail"}
  ]
}, {
  text: "Bella Alvarez",
  id: "balvarez",
  properties: [
    {text: "5724 Kelly Dr", id: "5724 Kelly Dr"},
    {text: "6037 Lakewview Drcowper St", id: "6037 Lakewview Drcowper St"}
  ]
}];

var allProperties = [];
LANDLORDS.forEach(function(landlord) {
  allProperties = allProperties.concat(landlord.properties);
});

LANDLORDS.unshift({text: "View All", id: "viewAll", properties: allProperties});

var Browse = React.createClass({

  render: function() {
    return (
      <AddressSelector landlords={LANDLORDS} selectedLandlord="viewAll" />
    );
  }

});

module.exports = Browse;