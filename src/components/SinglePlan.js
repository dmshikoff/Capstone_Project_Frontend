import React, { Component } from "react";
import { Row, Col, Button } from "react-materialize";
import {
  getAllPlansByUser,
  getAllRecipes,
  createNewPlan,
  getOnePlan,
  getPlannedRecipesByDay,
  groceryListGenerator,
  implementPlan
} from "../actions/actions";
import { withAuthentication } from "../helpers";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styling/Plans.css";

class SinglePlan extends Component {
  constructor(props) {
    super(props);

    this.state = {
      planName: "",
      week: {
        Sunday: [{ id: "", recipe: "" }],
        Monday: [{ id: "", recipe: "" }],
        Tuesday: [{ id: "", recipe: "" }],
        Wednesday: [{ id: "", recipe: "" }],
        Thursday: [{ id: "", recipe: "" }],
        Friday: [{ id: "", recipe: "" }],
        Saturday: [{ id: "", recipe: "" }]
      },
      implemented: false,
      groceries: true
    };
  }

  addNewRecipe = day => {
    const currentWeek = this.state.week;
    const newWeek = {
      ...currentWeek,
      [day]: [...currentWeek[day], { id: "", recipe: "" }]
    };
    this.setState({
      week: newWeek
    });
  };

  handleRecipeComplete = (index, recipe, day) => {
    const recipes = this.state.week[day].map((ele, i) => {
      if (i === index) {
        return { ...ele, id: recipe.id, recipe: recipe.name };
      } else {
        return { ...ele };
      }
    });
    this.setState({
      week: {
        ...this.state.week,
        [day]: recipes
      }
    });
  };

  componentDidMount = () => {
    this.props.getAllPlansByUser(this.props.authState.id);
    this.props.getAllRecipes(this.props.authState.id);
    this.props.getOnePlan(this.props.authState.id, this.props.match.params.id);
    this.props.getPlannedRecipesByDay(
      this.props.authState.id,
      this.props.match.params.id
    );
  };

  render() {
    console.log(this.props.groceryList)
    return (
      <div>
        <Navbar />
        <Row className="plans-row">
          <Row className="center-align">
            <h2>{this.props.onePlan.name}</h2>
          </Row>
          <div className="divider" />
          <Row>
            <Row className="plan-schedule-row">
              <Col className="completed-plan-day-cell sunday-cell">
                <Row className="cell-day-title center-align bold-text">
                  Sunday
                </Row>
                <Row>
                  {this.props.plannedRecipesByDay.map((ele, id) => {
                    let result;
                    if (ele.day === "Sunday") {
                      result = (
                        <p
                          data-plan-id={ele.plan_id}
                          data-recipe-id={ele.recipe_id}
                          key={ele.plan_id + '-' + id}
                          className="center-align"
                          onClick={event => {
                            this.props.history.push(
                              `/recipes/${ele.recipe_id}`
                            );
                          }}
                        >
                          {ele.name}
                        </p>
                      );
                    }
                    return result;
                  })}
                </Row>
              </Col>
              <Col className="completed-plan-day-cell monday-cell">
                <Row className="cell-day-title center-align bold-text">
                  Monday
                </Row>
                <Row>
                  {this.props.plannedRecipesByDay.map((ele, id) => {
                    let result;
                    if (ele.day === "Monday") {
                      result = (
                        <p
                          data-plan-id={ele.plan_id}
                          data-recipe-id={ele.recipe_id}
                          key={ele.plan_id + '-' + id}
                          className="center-align"
                        >
                          {ele.name}
                        </p>
                      );
                    }
                    return result;
                  })}
                </Row>
              </Col>
              <Col className="completed-plan-day-cell tuesday-cell">
                <Row className="cell-day-title center-align bold-text">
                  Tuesday
                </Row>
                <Row>
                  {this.props.plannedRecipesByDay.map((ele, id) => {
                    let result;
                    if (ele.day === "Tuesday") {
                      result = (
                        <p
                          data-plan-id={ele.plan_id}
                          data-recipe-id={ele.recipe_id}
                          key={ele.plan_id + '-' + id}
                          className="center-align"
                        >
                          {ele.name}
                        </p>
                      );
                    }
                    return result;
                  })}
                </Row>
              </Col>
              <Col className="completed-plan-day-cell wednesday-cell">
                <Row className="cell-day-title center-align bold-text">
                  Wednesday
                </Row>
                <Row>
                  {this.props.plannedRecipesByDay.map((ele, id) => {
                    let result;
                    if (ele.day === "Wednesday") {
                      result = (
                        <p
                          data-plan-id={ele.plan_id}
                          data-recipe-id={ele.recipe_id}
                          key={ele.plan_id + '-' + id}
                          className="center-align"
                        >
                          {ele.name}
                        </p>
                      );
                    }
                    return result;
                  })}
                </Row>
              </Col>
              <Col className="completed-plan-day-cell thursday-cell">
                <Row className="cell-day-title center-align bold-text">
                  Thursday
                </Row>
                <Row>
                  {this.props.plannedRecipesByDay.map((ele, id) => {
                    let result;
                    if (ele.day === "Thursday") {
                      result = (
                        <p
                          data-plan-id={ele.plan_id}
                          data-recipe-id={ele.recipe_id}
                          key={ele.plan_id + '-' + id}
                          className="center-align"
                        >
                          {ele.name}
                        </p>
                      );
                    }
                    return result;
                  })}
                </Row>
              </Col>
              <Col className="completed-plan-day-cell friday-cell">
                <Row className="cell-day-title center-align bold-text">
                  Friday
                </Row>
                <Row>
                  {this.props.plannedRecipesByDay.map((ele, id) => {
                    let result;
                    if (ele.day === "Friday") {
                      result = (
                        <p
                          data-plan-id={ele.plan_id}
                          data-recipe-id={ele.recipe_id}
                          key={ele.plan_id + '-' + id}
                          className="center-align"
                        >
                          {ele.name}
                        </p>
                      );
                    }
                    return result;
                  })}
                </Row>
              </Col>
              <Col className="completed-plan-day-cell saturday-cell">
                <Row className="cell-day-title center-align bold-text">
                  Saturday
                </Row>
                <Row>
                  {this.props.plannedRecipesByDay.map((ele, id) => {
                    let result;
                    if (ele.day === "Saturday") {
                      result = (
                        <p
                          data-plan-id={ele.plan_id}
                          data-recipe-id={ele.recipe_id}
                          key={ele.plan_id + '-' + id}
                          className="center-align"
                          onClick={event => {
                            this.props.history.push(
                              `./recipes/${ele.recipe_id}`
                            );
                          }}
                        >
                          {ele.name}
                        </p>
                      );
                    }
                    return result;
                  })}
                </Row>
              </Col>
            </Row>
            <Row className="save-plan-button">
              <Button
                onClick={() => {
                  this.props.groceryListGenerator(this.props.authState.id, this.props.match.params.id, (hasData)=>{
                    if(hasData){
                      this.setState({groceries: true})
                      window.open(
                      `/printableplan/${this.props.match.params.id}`,
                      "_blank"
                    );
                    }
                    else{
                  setTimeout(() => {
                    this.setState({groceries:true});
                  }, 2000);
                      this.setState({groceries:false})
                    }
                  })
                }}
              >
                Generate Grocery List
              </Button>
              <Button
                onClick={event => {
                  this.props.implementPlan(
                    this.props.authState.id,
                    this.props.match.params.id
                  );
                  this.setState({ implemented: true });
                  setTimeout(() => {
                    this.setState({ implemented: false});
                  }, 2000);
                }}
              >
                Implement Meal Plan
              </Button>
            </Row>
          </Row>
          <Row className="grocery-list-row error-display">
            <Col>
              {
                this.state.groceries ?
                null :
                <p>You currently possess the required amount of ingredients to implement this meal plan</p>
              }
            </Col>
            <Col className="error-display">
              <p>
                {
                  this.state.implemented ? 
                <p>Your plan has been implemented and the ingredients have been deducted from your pantry!</p> : 
                null
                }
              </p>
            </Col>
          </Row>
        </Row>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({
  plansByUser,
  recipesByUser,
  newPlan,
  onePlan,
  plannedRecipesByDay,
  groceryList,
  implementedPlan
}) => ({
  plansByUser,
  recipesByUser,
  newPlan,
  onePlan,
  plannedRecipesByDay,
  groceryList,
  implementedPlan
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllPlansByUser,
      getAllRecipes,
      createNewPlan,
      getOnePlan,
      getPlannedRecipesByDay,
      groceryListGenerator,
      implementPlan
    },
    dispatch
  );

export default withRouter(
  withAuthentication(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(SinglePlan)
  )
);
