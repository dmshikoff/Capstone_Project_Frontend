import React from "react";
import { Row, Col, Modal } from "react-materialize";
import { withRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import fridge from "../images/fridge.svg";
import recipe from "../images/recipes.svg";
import calendar from "../images/calendar.svg";
import info from "../images/info-circle.svg";
import "../styling/Dashboard.css";

const Dashboard = (props) => {
  return (
    <div>
      <Navbar />
      <Row className="dashboard-div">
        <Row className="center-align">
          <h2 className="my-dashboard-title-row">My Dashboard <Modal
              header="Dashboard Help"
              trigger={<img className="dash-info-img" src={info} alt="info" />}
            >
              <ul>
                <li>Select any of the three options below to get started.</li>
                <li>Each one will take you to a different module within this site.</li>
                <ul>
                <li>• To manage your Pantry, such as adding and removing ingredients select My Pantry</li>
                <li>• To manage your Cookbook, where you are add recipes and keep track of all your recipes, select My Cookbook</li>
                <li>• Finally, to create new meal plans, generate grocery lists, or implement existing meal plans, select My Plans</li>
                </ul>
              </ul>
            </Modal></h2>
          
        </Row>
        <div className="divider" />
        <Row className="path-row">
          <Col s={4} className="fridge-col pantry-col-dashboard center-align"
          onClick={event => {
              props.history.push('./Ingredients')
          }}
          >
            <div className="fridge-icon-background icon-background">
              <img className="fridge-icon" src={fridge} alt="fridge logo" />
            </div>
            <h5 className="bold-text">My Pantry</h5>
            <div className="divider" />
            <ul className="pantry-list">
                <li className="list-item">Manage your digital pantry</li>
                <li className="list-item">View a list of all your ingredients</li>
                <li className="list-item">Add ingredients to your digital pantry</li>
            </ul>
          </Col>
          <Col s={4} className="recipe-col recipe-col-dashboard center-align"
          onClick={event => {
              props.history.push('./Cookbook')
          }}
          >
            <div className="recipe-icon-background icon-background">
              <img className="recipe-icon" src={recipe} alt="recipe logo" />
            </div>
            <h5 className="bold-text">My Cookbook</h5>
            <div className="divider" />
            <ul className="recipe-list">
                <li className="list-item">Manage your cookbook</li>
                <li className="list-item">Add new recipes to your cookbook</li>
                <li className="list-item">Edit or remove existing recipes</li>
            </ul>
          </Col>
          <Col s={4} className="calendar-col plans-col-dashboard center-align"
          onClick={event => {
              props.history.push("./Plans")
          }}
          >
            <div className="calendar-icon-background icon-background">
              <img
                className="calendar-icon"
                src={calendar}
                alt="calendar logo"
              />
            </div>
            <h5 className="bold-text">My Meal Plans</h5>
            <div className="divider" />
            <ul className="plan-list">
                <li className="list-item">Create and save new meal plans</li>
                <li className="list-item">Select which meal plans to follow each week</li>
                <li className="list-item">Download digital shopping list for all your missing ingredients</li>
            </ul>
          </Col>
        </Row>
      </Row>
      <Footer />
    </div>
  );
};

export default withRouter(Dashboard);
