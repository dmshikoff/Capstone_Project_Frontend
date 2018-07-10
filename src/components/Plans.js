import React, { Component } from "react";
import { Row, Input, Col } from "react-materialize"
import { getAllPlansByUser } from "../actions/actions";
import { withAuthentication } from "../helpers";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styling/Plans.css"

class Plans extends Component{
    constructor(props){
        super(props)

        this.state={}
    }

    componentDidMount = () => {
        this.props.getAllPlansByUser(this.props.authState.id)
    }

    render(){
        console.log(this.props.plansByUser)
        return (
            <div>
            <Navbar />
            <Row className="plans-row">
            <Row className="center-align">
            <h2>My Plans</h2>
            </Row>
            <div className="divider" />
              <Row className="recipe-row">
                <ul id="triple">
                  {this.props.plansByUser.map( ele => {
                      return <li key={ele.id}>{ele.name}</li>
                  })}
                </ul>
              </Row>
              <div className="divider" />
              <Row className="center-align">
              <h4>Create a new Meal Plan</h4>
              </Row>
              <Row>
              <form>
              <Row className="new-plan-row">
              <Input label="Plan Name" />
              </Row>
              <Row className="plan-schedule-row">
              <Col className="plan-day-cell">
              Sunday
              </Col>
              <Col className="plan-day-cell">
              Monday
              </Col>
              <Col className="plan-day-cell">
              Tuesday
              </Col>
              <Col className="plan-day-cell">
              Wednesday
              </Col>
              <Col className="plan-day-cell">
              Thursday
              </Col>
              <Col className="plan-day-cell">
              Friday
              </Col>
              <Col className="plan-day-cell">
              Saturday
              </Col>
              </Row>
              </form>
              </Row>
            </Row>
            <Footer />
            </div>
        )
    }
}

const mapStateToProps = ({ plansByUser }) => ({ plansByUser });
  
  const mapDispatchToProps = dispatch =>
    bindActionCreators(
      { getAllPlansByUser },
      dispatch
    );
  
  export default withAuthentication(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Plans)
  );