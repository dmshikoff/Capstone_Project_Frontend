import React, { Component } from "react";
import { Row, Col, Button, Modal } from "react-materialize";
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
import info from "../images/info-circle.svg";
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
      implemented: false
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
    return (
      <div>
        <Navbar />
        <Row className="plans-row">
          <Row className="single-plan-title-row">
            <h2>{this.props.onePlan.name}</h2>
            <Modal
              header="Add/Remove Ingredient Help"
              trigger={<img className="single-plan-info-img" src={info} alt="info" />}
            >
              <ol>
                <li>All units are by volume or count total. If you purchased an ingredient that is sold by weight, take a look at the nutitional facts. The serving size is most often in volume. To get the total, multiply the serving size by the servings per container.
                <ul>
                <li>
                *For example, flour is typically sold by the pound. The serving size for flour is about 1/4 cup. If the number of servings per container is 15, you would multiply 1/4 by 15, which is 3 3/4 cups total.
                </li>
                </ul>
                </li>
                <li>Enter in a value for Name, Quantity and Unit</li>
                <li>
                  Choose whether or not you wish to add the ingredient to your
                  pantry or remove it.
                  <ul>
                    <li>
                    *Note that ingredients are automatically removed from your pantry if they are used in a plan that you have implemented.<span className="bold-text"> They do not need to be manually removed.</span>
                    </li>
                  </ul>
                </li>
                <li>
                If you wish to update the quantity, for eample, if the ingredient spoiled, select "Remove" and CICI will search for the existing ingredient and sbutract the quantity entered.
                </li>
                <li>
                For an easier and faster approach to adding and removing ingredients, download our Alexa Skill and use your Echo! 
                </li>
              </ol>
            </Modal>
          </Row>
          <div className="divider" />
          <Row>
            <Row className="plan-schedule-row">
              <Col className="completed-plan-day-cell sunday-cell">
                <Row className="cell-day-title center-align bold-text">
                  Sunday
                </Row>
                <Row>
                  {this.props.plannedRecipesByDay.map(ele => {
                    let result;
                    if (ele.day === "Sunday") {
                      result = (
                        <p
                          data-plan-id={ele.plan_id}
                          data-recipe-id={ele.recipe_id}
                          key={ele.recipe_id}
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
                  {this.props.plannedRecipesByDay.map(ele => {
                    let result;
                    if (ele.day === "Monday") {
                      result = (
                        <p
                          data-plan-id={ele.plan_id}
                          data-recipe-id={ele.recipe_id}
                          key={ele.recipe_id}
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
                  {this.props.plannedRecipesByDay.map(ele => {
                    let result;
                    if (ele.day === "Tuesday") {
                      result = (
                        <p
                          data-plan-id={ele.plan_id}
                          data-recipe-id={ele.recipe_id}
                          key={ele.recipe_id}
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
                  {this.props.plannedRecipesByDay.map(ele => {
                    let result;
                    if (ele.day === "Wednesday") {
                      result = (
                        <p
                          data-plan-id={ele.plan_id}
                          data-recipe-id={ele.recipe_id}
                          key={ele.recipe_id}
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
                  {this.props.plannedRecipesByDay.map(ele => {
                    let result;
                    if (ele.day === "Thursday") {
                      result = (
                        <p
                          data-plan-id={ele.plan_id}
                          data-recipe-id={ele.recipe_id}
                          key={ele.recipe_id}
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
                  {this.props.plannedRecipesByDay.map(ele => {
                    let result;
                    if (ele.day === "Friday") {
                      result = (
                        <p
                          data-plan-id={ele.plan_id}
                          data-recipe-id={ele.recipe_id}
                          key={ele.recipe_id}
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
                  {this.props.plannedRecipesByDay.map(ele => {
                    let result;
                    if (ele.day === "Saturday") {
                      result = (
                        <p
                          data-plan-id={ele.plan_id}
                          data-recipe-id={ele.recipe_id}
                          key={ele.recipe_id}
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
                onClick={event => {
                  this.props.groceryListGenerator(
                    this.props.authState.id,
                    this.props.match.params.id
                  );
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
          <Row className="grocery-list-row">
            <Col>
              <ul>
                {this.props.groceryList.map(ele => {
                  let result;
                  if (ele.quantity < 0) {
                    window.open(`http://localhost:3000/printableplan/${this.props.match.params.id}`, '_blank')
                  } else {
                    result =
                      "You currently possess the required amount of ingredients to implement this meal plan";
                  }
                  return result;
                })}
              </ul>
              <p>
                {this.state.implemented
                  ? "Your plan has been implemented and the ingredients have been deducted from your pantry!"
                  : null}
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
