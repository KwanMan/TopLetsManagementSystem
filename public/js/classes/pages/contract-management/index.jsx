var React = require("react");
var PageHeading = require("../../components/page-heading.jsx");

var DATA = [{
  first: "Tommy",
  last: "Kwan",
  age: 22
}, {
  first: "Rob",
  last: "Game",
  age: 21
}, {
  first: "Sophie",
  last: "Keen",
  age: 23
}];

module.exports = React.createClass({

  render: function() {
    return (
        <div>
          <PageHeading title="Contract Management" />
        </div>
    );
  }

});