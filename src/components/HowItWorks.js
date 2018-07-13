import React from "react";
import { Row, Col, Button } from "react-materialize";
import "../styling/HowItWorks.css";
import fridge from "../images/fridge.svg";
import recipe from "../images/recipes.svg";
import calendar from "../images/calendar.svg";
import { withAuthentication } from "../helpers";
import { withRouter } from "react-router-dom"

const HowItWorks = (props) => {
  console.log(props)
  return (
    <div className="how-it-works-div">
      <Row>
        <Col className="center-align how-title-con">
          <h3>How It Works</h3>
        </Col>
      </Row>
      <Row className="icon-row">
        <Col s={4} className="fridge-col center-align">
          <div className="fridge-icon-background icon-background">
            <img className="fridge-icon" src={fridge} alt="fridge logo" />
          </div>
          <h5>Track your ingredients</h5>
          <p>
            It's as simple as <span className="bold-text">asking Alexa to add the ingredient and quantity.</span> Don't have an Amazon Echo?
            You can still enter your ingredients directly from your account page.
          </p>
        </Col>
        <Col s={4} className="recipe-col center-align">
          <div className="recipe-icon-background icon-background">
            <img className="recipe-icon" src={recipe} alt="recipe logo" />
          </div>
          <h5>Save your favorite recipes</h5>
          <p>
            Save these recipes to your own personalized recipe book and <span className="bold-text">add them to your meal plans later.</span>
          </p>
        </Col>
        <Col s={4} className="calendar-col center-align">
          <div className="calendar-icon-background icon-background">
            <img className="calendar-icon" src={calendar} alt="calendar logo" />
          </div>
          <h5>Build custom meal plans</h5>
          <p>
            Insert as many recipes as you wish per day, to fit your dietary and fitness needs. 
            When it's time to go shopping, <span className="bold-text">CICI will generate a shopping list for you!</span>
          </p>
        </Col>
      </Row>
      <Row className="get-started-button-row">
      <Button
      onClick={() => {
        if(props.authState){
          props.history.push('/dashboard/')
        }
        else{
          props.history.push('./login')
        }
      }}
      >
      Get Started Now
      </Button>
      </Row>
    </div>
  );
};

export default withRouter(withAuthentication(HowItWorks));
