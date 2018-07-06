import React from "react";
import { Footer, Row, Col } from "react-materialize";
import "../styling/Footer.css";

const Foot = () => {
  return (
    <div>
      <Footer
        copyrights="2018 Copyright Can I Cook It"
        links={
          <ul>
            <li>
              <a className="grey-text text-lighten-3" href="#!">
              <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a className="grey-text text-lighten-3" href="#!">
              <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a className="grey-text text-lighten-3" href="#!">
              <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a className="grey-text text-lighten-3" href="#!">
              <i className="fab fa-snapchat-ghost"></i>
              </a>
            </li>
          </ul>
        }
        className="example"
      >
        <Row>
          <Col>
            <ul className="footer-list">
              <span className="bold-text">Can I Cook It</span>
              <li>Login</li>
              <li>Help</li>
              <li>Contact</li>
            </ul>
          </Col>
        </Row>
      </Footer>
    </div>
  );
};

export default Foot;
