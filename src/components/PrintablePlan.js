import React, { Component } from "react";
import { Row, Col, Button } from "react-materialize";
import { withAuthentication, request } from "../helpers";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { groceryListGenerator } from "../actions/actions";
import "../styling/PrintablePlan.css";

class PrintablePlan extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    this.props.groceryListGenerator(
      this.props.authState.id,
      this.props.match.params.id
    );
  };

  render() {
    console.log(this.props.groceryList);
    return (
      <div>
        <Row className="printable-plan-row">
          <Row className="printable-plan-title-row center-align">
            <h2>Grocery List</h2>
          </Row>
          <Row className="printable-plan-grocery-list">
            <Col>
              <ol>
                {this.props.groceryList.map(ele => {
                  return (
                    <li key={ele.ingredient_id}>
                      {Math.abs(ele.quantity)} {ele.unit}
                      {"(s) "}
                      {ele.name}
                    </li>
                  );
                })}
              </ol>
            </Col>
          </Row>
          <Row className="printable-plan-list-buttons">
          <Button waves='light'
          onClick={()=>{
              window.print()
          }}
          >Print List</Button>
          <Button waves='light'
          onClick={()=>{
            const result = this.props.groceryList.map(ele => {
                  return (
                    `<li>
                      ${Math.abs(ele.quantity)} 
                      ${ele.unit}
                      ${"(s) "}
                      ${ele.name}
                    </li>`
                  );
                })
                const listString = `<ol>${result}</ol>`
              request(`/users/${this.props.authState.id}/plans/${this.props.match.params.id}/email`, 'post', {listString})
          }}
          >Email List</Button>
          </Row>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ groceryList }) => ({ groceryList });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ groceryListGenerator }, dispatch);

export default withRouter(
  withAuthentication(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(PrintablePlan)
  )
);
