var React  = require("react");
var Router = require("react-router");

var Route         = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute  = Router.DefaultRoute;
var Redirect      = Router.Redirect;
var Link          = Router.Link;
var RouteHandler  = Router.RouteHandler;

var routes = (
  <Route name="app" path="/" handler={require("./app.jsx")}>

    <Route name="login" handler={require("pages/login/login.jsx")} />

    <Route name="dashboard" handler={require("pages/home/home.jsx")} />

    <Route name="property-management">
      <Route name="property-browse" path="browse" handler={require("pages/property-management/browse.jsx")} />
      <Route name="edit-landlord" path="edit-landlord/:id" handler={require("pages/property-management/edit-landlord.jsx")} />
      <Route name="edit-property" path="edit-property/:id" handler={require("pages/property-management/edit-property.jsx")} />
      <Route name="landlord-new" path="new-landlord" handler={require("pages/property-management/new-landlord.jsx")} />
      <Route name="property-new" path="new-property" handler={require("pages/property-management/new-property.jsx")} />
      <Redirect from="?" to="property-browse" />
      <Redirect from="*" to="property-browse" />
    </Route>

    <Route name="contract-management" path="contract-management">
      <Route name="contract-browse" path="browse/?:year?" handler={require("pages/contract-management/browse.jsx")} />
      <Route name="new-contract" path="new-contract/:year/:propertyid" handler={require("pages/contract-management/new-contract.jsx")} />
      <Route name="view-contract" path="view-contract/:id" handler={require("pages/contract-management/view-contract.jsx")} />
      <Route name="setup-payments" path="setup-payments/:contractid" handler={require("pages/contract-management/setup-payments.jsx")} />
      <Redirect from="?" to="contract-browse" />
      <Redirect from="*" to="contract-browse" />
    </Route>

    <Route name="rent-payment" handler={require("pages/rent-payment/browse.jsx")} />

    <Route name="report-management" path="report-management">
      <Route name="report-browse" path="browse" handler={require("pages/report-management/browse.jsx")} />
      <Route name="receipt-new" path="new-receipt" handler={require("pages/report-management/new-receipt.jsx")} />
      <Route name="new-property-report" path="new-property-report/:propertyid/:year/:month" handler={require("pages/report-management/new-property-report.jsx")} />
      <Route name="view-property-report" path="view-report/:id" handler={require("pages/report-management/view-report.jsx")} />
      <Redirect from="?" to="report-browse" />
      <Redirect from="*" to="report-browse" />
    </Route>

    <Route name="settings" handler={require("pages/settings/settings.jsx")} />

    <Redirect from="*" to="dashboard" />
  </Route>
);

Router.run(routes, function (Handler, state) {
  var routes = state.routes.map(function(route) {
    return route.name;
  });
  React.render(<Handler currentPath={routes} params={state.params} />, document.body);
});
