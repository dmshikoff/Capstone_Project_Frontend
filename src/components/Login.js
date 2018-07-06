import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoginForm from "./LoginForm";
import NewUserForm from "./NewUserForm";
import "../styling/Login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: false
    };
  }

  handleLoginForm = () => {
    this.setState({newUser: !this.state.newUser})
  }

  render() {
    return (
      <div>
        <Navbar />
        {this.state.newUser ?
        <NewUserForm newUser={this.state.newUser} handleLoginForm={this.handleLoginForm} /> :
        <LoginForm newUser={this.state.newUser} handleLoginForm={this.handleLoginForm} />}
        <Footer />
      </div>
    );
  }
}

export default withRouter(Login);
