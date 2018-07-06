import React from "react";
import { Row, Col } from "react-materialize";
import "../styling/Banner.css";

const Banner = () => {
  return (
    <div className="banner">
      <Row>
        <Col className="center-align banner-text">
        <h2>Welcome to Meal Prepping made easy</h2>
        <h5>Manage your pantry, recipes and meal plans all from one location</h5>
        </Col>
      </Row>
    </div>
  );
};

export default Banner;
