var React  = require("react");
var Router = require("react-router");

var Route         = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute  = Router.DefaultRoute;
var Redirect      = Router.Redirect;
var Link          = Router.Link;
var RouteHandler  = Router.RouteHandler;

var Handlers = {

  Login: require("pages/login/login.jsx"),

  App: require("./app.jsx"),

  Dashboard: require("pages/home/home.jsx"),

  PropertyManagement: {
    Main: require("pages/property-management/index.jsx"),
    Browse: require("pages/property-management/browse.jsx"),
    EditLandlord: require("pages/property-management/edit-landlord.jsx"),
    NewLandlord: require("pages/property-management/new-landlord.jsx"),
    NewProperty: require("pages/property-management/new-property.jsx")
  },

  ContractManagement: {
    Main: require("pages/contract-management/index.jsx"),
    Browse: require("pages/contract-management/browse.jsx"),
    NewContract: require("pages/contract-management/new-contract.jsx")
  },

  ReportManagement: {
    Browse: require("pages/report-management/browse.jsx"),
    NewPropertyReport: require("pages/report-management/new-property-report.jsx")
  },

  RentPayment: require("pages/rent-payment/browse.jsx"),

  Settings: require("pages/settings/settings.jsx")
};

var routes = (
  <Route name="app" path="/" handler={Handlers.App}>

    <Route name="login" handler={Handlers.Login} />

    <Route name="dashboard" handler={Handlers.Dashboard} />

    <Route name="property-management" handler={Handlers.PropertyManagement.Main}>
      <DefaultRoute handler={Handlers.PropertyManagement.Browse} />
      <Route name="edit-landlord" path="edit-landlord/:id" handler={Handlers.PropertyManagement.EditLandlord} />
      <Route name="new-landlord" path="new-landlord" handler={Handlers.PropertyManagement.NewLandlord} />
      <Route name="new-property" path="new-property" handler={Handlers.PropertyManagement.NewProperty} />
    </Route>

    <Route name="contract-management" path="contract-management/?:year?" handler={Handlers.ContractManagement.Main}>
      <DefaultRoute handler={Handlers.ContractManagement.Browse} />
      <Route name="new-contract" path="new-contract/:propertyid" handler={Handlers.ContractManagement.NewContract} />
    </Route>

    <Route name="rent-payment" handler={Handlers.RentPayment} />

    <Route name="report-management" path="report-management" handler={Handlers.ReportManagement.Main}>
      <DefaultRoute handler={Handlers.ReportManagement.Browse} />
      <Route name="new-property-report" path="new-property-report/:propertyid/:year/:month" handler={Handlers.ReportManagement.NewPropertyReport} />
    </Route>

    <Route name="settings" handler={Handlers.Settings} />

    <Redirect from="/" to="dashboard" />
  </Route>
);

Router.run(routes, function (Handler, state) {
  var routes = state.routes.map(function(route) {
    return route.name;
  });
  React.render(<Handler currentPath={routes} params={state.params} />, document.body);
});
