import React, {Component} from "react";
import { Row, Input, Button, Col } from "react-materialize";
import { request, AuthenticationService } from "../helpers";
import { withRouter } from "react-router-dom";
import "../styling/Login.css";

class UserLoginForm extends Component{
  constructor(props){
    super(props)

    this.state = {
      loginError: false
    }
  }

  render(){
    return (
      <div>
        <Row className="body-row">
          <Row className="login-row center-align">
            <p>
              Create an account with us today to gain access to your own
              personalized ingredients, recipes and meal plans
            </p>
            <h4>Login</h4>
            <form
              onSubmit={event => {
                event.preventDefault();
                request("/auth/token", "post", {
                  username: event.target.email.value,
                  password: event.target.password.value
                })
                  .then(response => {
                    localStorage.setItem("token", response.data.token);
                    return request("/auth/token");
                  })
                  .then(response => {
                    AuthenticationService.setAuthState(response.data);
                    this.props.history.push("./Dashboard");
                  })
                  .catch(err => {
                    this.setState({loginError: true})
                  });
              }}
            >
              <Row className="form-input-row">
                <Input
                  className="login-form-input"
                  name="email"
                  type="email"
                  label="Email"
                />
                <Input
                  className="login-form-input"
                  name="password"
                  type="password"
                  label="Password"
                />
              </Row>
              <Row className="login-button">
                <Col>
                  <Button>Login</Button>
                </Col>
              </Row>
            </form>
            <Row className="error-display">
            {
              this.state.loginError ?
              <p>No record of user found</p> :
              null
            }
            </Row>
          </Row>
          <div className="divider" />
          <Row className="new-user-row">
            <p className="new-user">New User?</p>
            <Button
              onClick={event => {
                this.props.handleLoginForm();
              }}
            >
              Sign Up
            </Button>
          </Row>
        </Row>
      </div>
    );
  }
};

export default withRouter(UserLoginForm);
