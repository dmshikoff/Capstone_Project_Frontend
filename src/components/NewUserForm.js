import React from "react";
import { Row, Input, Col, Button } from "react-materialize";
import { AuthenticationService, request } from '../helpers';
import { withRouter } from "react-router-dom";
import "../styling/NewUserForm.css";

const NewUserForm = (props) => {
  return (
    <div className="new-user-form-div">
      <Row className="center-align">
        <p>
          Create an account with us today to gain access to your own
          personalized ingredients, recipes and meal plans
        </p>
        <h4>Create Account</h4>
        <form
          onSubmit={event => {
            event.preventDefault();
            event.persist();
            request("/users", "post", {
              fname: event.target.firstName.value,
              lname: event.target.lastName.value,
              email: event.target.email.value,
              password: event.target.password.value
            })
              .then(response => {
                return request("/auth/token", "post", {
                  username: response.data.data.email,
                  password: event.target.password.value
                });
              })
              .then(response => {
                localStorage.setItem("token", response.data.token);
                return request("/auth/token");
              })
              .then(response => {
                console.log(response);
                AuthenticationService.setAuthState(response.data);
                props.history.push("./Dashboard");
              });
          }}
        >
          <Row className="input-row">
            <Input name="firstName" type="text" label="First Name" />
            <Input name="lastName" type="text" label="Last Name" />
            <Input name="email" type="email" label="Email" />
            <Input name="password" type="password" label="Password" />
          </Row>
          <Row className="sign-up-button">
            <Col>
              <Button>Sign Up</Button>
            </Col>
          </Row>
        </form>
      </Row>
      <div className="divider" />
      <Row className="new-user-row">
        <p className="new-user">Already have an account?</p>
        <Button
        onClick={event => {
                props.handleLoginForm()
              }}
        >Login</Button>
      </Row>
    </div>
  );
};

export default withRouter(NewUserForm);
