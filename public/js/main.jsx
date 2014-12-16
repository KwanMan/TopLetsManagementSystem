var React  = require("react");
var Router = require("react-router");

var Route         = Router.Route;
var Routes        = Router.Routes;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute  = Router.DefaultRoute;
var Redirect      = Router.Redirect;

var App = require("./app.jsx");

var Home     = require("./classes/pages/home/home.jsx");
var Settings = require("./classes/pages/settings/settings.jsx");

window.React = React;

React.render((
  <Routes location="history">
    <Route name="app" path="/" handler={App}>
      <Route name="home" handler={Home} pageTitle="Home" />
      <Route name="settings" handler={Settings} pageTitle="Settings" />
      <Redirect from="/" to="home" />
    </Route>
  </Routes>
), document.body);