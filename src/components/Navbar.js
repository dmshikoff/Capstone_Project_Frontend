import React from "react";
import { Navbar, NavItem } from "react-materialize";
import { withRouter } from "react-router-dom";
import { withAuthentication, AuthenticationService } from "../helpers";
import logo from "../images/cici-thick.png";
import "../styling/Navbar.css";
const scrollToElement = require('scroll-to-element');

const Nav = props => {
  const img = <img className="logo-img" src={logo} alt="logo" />;
  return (
    <Navbar brand={img} right>
      {
        props.authState ?
        <span className="welcome-nav-name">Welcome, {props.authState.first_name}</span> :
        null
      }
      {
        props.authState ?
        <NavItem 
        onClick={() => props.history.push("/dashboard")}
        >
          My Dashboard
        </NavItem> : 
        <NavItem
        onClick={event => {
          scrollToElement(".how-title-con")
        }}
        >
        How It Works
        </NavItem>
      }
      {
        props.authState ? 
        <NavItem
          onClick={() => {
            localStorage.removeItem("token");
            AuthenticationService.setAuthState(null);
          }}>
          Logout
        </NavItem> : 
        <NavItem onClick={() => props.history.push("./Login")}>
          Login
        </NavItem>
      }
    </Navbar>
  );
};

export default withAuthentication(withRouter(Nav));
