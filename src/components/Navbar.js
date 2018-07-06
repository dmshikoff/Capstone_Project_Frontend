import React from "react";
import { Navbar, NavItem } from "react-materialize";
import { withRouter } from "react-router-dom";
import { withAuthentication, AuthenticationService } from "../helpers";
import logo from "../images/cici-thick.png";
import "../styling/Navbar.css";

const Nav = props => {
  const img = <img className="logo-img" src={logo} alt="logo" />;
  return (
    <Navbar brand={img} right>
      {
        props.authState ?
        <NavItem onClick={() => props.history.push("./Dashboard")}>
          My Dashboard
        </NavItem> : 
        <NavItem>
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
