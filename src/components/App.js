import "../styling/materialize-custom.css";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthenticatedRoute } from "../helpers";
import Home from "./Home";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Ingredients from "./Ingredients";
import Cookbook from "./Cookbook";
import "../styling/App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <AuthenticatedRoute exact path="/Dashboard" component={Dashboard} />
          <AuthenticatedRoute exact path="/Ingredients" component={Ingredients} />
          <AuthenticatedRoute exact path="/Cookbook" component={Cookbook} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
