import "../styling/materialize-custom.css";
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthenticatedRoute } from "../helpers";
import Home from "./Home";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Ingredients from "./Ingredients";
import Cookbook from "./Cookbook";
import Plans from "./Plans";
import Recipe from "./Recipe"
import SinglePlan from "./SinglePlan"
import "../styling/App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <AuthenticatedRoute exact path="/dashboard" component={Dashboard} />
          <AuthenticatedRoute exact path="/ingredients" component={Ingredients} />
          <AuthenticatedRoute exact path="/cookbook" component={Cookbook} />
          <AuthenticatedRoute exact path="/plans" component={Plans} />
          <AuthenticatedRoute exact path="/recipes/:id" component={Recipe} />
          <AuthenticatedRoute exact path="/plans/:id" component={SinglePlan} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
