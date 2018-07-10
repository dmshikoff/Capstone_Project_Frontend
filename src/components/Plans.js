import React, { Component } from "react";
import { Row, Input, Col, Autocomplete, Button } from "react-materialize";
import { getAllPlansByUser, getAllRecipes } from "../actions/actions";
import { withAuthentication } from "../helpers";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styling/Plans.css";

class Plans extends Component {
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
      }
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
    console.log("hello?")
    const recipes = this.state.week[day].map((ele, i) => {
      if (i === index) {
        return { ...ele, id: recipe.id, recipe: recipe.name };
      } else {
        return { ...ele };
      }
    });
    console.log("recipe", recipes)
    this.setState({week: {
      ...this.state.week,
      [day]: recipes 
    }});
  };

  componentDidMount = () => {
    this.props.getAllPlansByUser(this.props.authState.id);
    this.props.getAllRecipes(this.props.authState.id);
  };

  render() {
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
              {this.props.plansByUser.map(ele => {
                return <li key={ele.id}>{ele.name}</li>;
              })}
            </ul>
          </Row>
          <div className="divider" />
          <Row className="center-align">
            <h4>Create a new Meal Plan</h4>
          </Row>
          <Row>
            <form
            onSubmit={event => {
              event.preventDefault()
              
            }}
            >
              <Row className="new-plan-row">
                <Input label="Plan Name" />
              </Row>
              <Row className="plan-schedule-row">
                <Col className="plan-day-cell sunday-cell">
                  <Row className="cell-day-title center-align">Sunday</Row>
                  <Row>
                    {this.state.week.Sunday.map((ele, index) => {
                      return (
                        <Autocomplete
                          title="Recipe"
                          key={index}
                          className="plan-recipe-input monday-recipe-input"
                          data={this.props.recipesByUser.reduce((acc, ele) => {
                            acc[ele.name] = null;
                            return acc;
                          }, {})}
                          onChange={event => {
                            const recipe = this.props.recipesByUser.find(ele => ele.name === event.target.value);
                            if (recipe) {
                              this.handleRecipeComplete(index, recipe, "Sunday")
                            }
                            else {
                              
                            } 
                          }}
                          onAutocomplete={recipeName => {
                            console.log('name', recipeName)
                            const recipe = this.props.recipesByUser.find(ele => ele.name === recipeName)
                            this.handleRecipeComplete(index, recipe, "Sunday")
                        }}
                        />
                      );
                    })}
                    <Row className="center-align">
                      <div
                        onClick={event => {
                          this.addNewRecipe("Sunday");
                        }}
                      >
                        <i className="fas fa-plus-circle" />
                      </div>
                    </Row>
                  </Row>
                </Col>
                <Col className="plan-day-cell monday-cell">
                  <Row className="cell-day-title center-align">Monday</Row>
                  <Row>
                    {this.state.week.Monday.map((ele, index) => {
                      return (
                        <Autocomplete
                          title="Recipe"
                          key={index}
                          value={this.state.week.Monday[0].recipe}
                          className="plan-recipe-input"
                          data={this.props.recipesByUser.reduce((acc, ele) => {
                            acc[ele.name] = null;
                            return acc;
                          }, {})}
                          onChange={event => {
                            const recipe = this.props.recipesByUser.find(ele => ele.name === event.target.value);
                            if (recipe) {
                              this.handleRecipeComplete(index, recipe, "Monday")
                            } 
                          }}
                          onAutocomplete={recipeName => {
                            console.log('name', recipeName)
                            const recipe = this.props.recipesByUser.find(ele => ele.name === recipeName)
                            this.handleRecipeComplete(index, recipe, "Monday")
                        }}
                        />
                      );
                    })}
                    <Row className="center-align">
                      <div
                        onClick={event => {
                          this.addNewRecipe("Monday");
                        }}
                      >
                        <i className="fas fa-plus-circle" />
                      </div>
                    </Row>
                  </Row>
                </Col>
                <Col className="plan-day-cell tuesday-cell">
                  <Row className="cell-day-title center-align">Tuesday</Row>
                  <Row>
                    {this.state.week.Tuesday.map((ele, index) => {
                      return (
                        <Autocomplete
                          title="Recipe"
                          key={index}
                          className="plan-recipe-input"
                          data={this.props.recipesByUser.reduce((acc, ele) => {
                            acc[ele.name] = null;
                            return acc;
                          }, {})}
                          onChange={event => {
                            const recipe = this.props.recipesByUser.find(ele => ele.name === event.target.value);
                            if (recipe) {
                              this.handleRecipeComplete(index, recipe, "Tuesday")
                            } 
                          }}
                          onAutocomplete={recipeName => {
                            console.log('name', recipeName)
                            const recipe = this.props.recipesByUser.find(ele => ele.name === recipeName)
                            this.handleRecipeComplete(index, recipe, "Tuesday")
                        }}
                        />
                      );
                    })}
                    <Row className="center-align">
                      <div
                        onClick={event => {
                          this.addNewRecipe("Tuesday");
                        }}
                      >
                        <i className="fas fa-plus-circle" />
                      </div>
                    </Row>
                  </Row>
                </Col>
                <Col className="plan-day-cell wednesday-cell">
                  <Row className="cell-day-title center-align">Wednesday</Row>
                  <Row>
                    {this.state.week.Wednesday.map((ele, index) => {
                      return (
                        <Autocomplete
                          title="Recipe"
                          key={index}
                          className="plan-recipe-input"
                          data={this.props.recipesByUser.reduce((acc, ele) => {
                            acc[ele.name] = null;
                            return acc;
                          }, {})}
                          onChange={event => {
                            const recipe = this.props.recipesByUser.find(ele => ele.name === event.target.value);
                            if (recipe) {
                              this.handleRecipeComplete(index, recipe, "Wednesday")
                            } 
                          }}
                          onAutocomplete={recipeName => {
                            console.log('name', recipeName)
                            const recipe = this.props.recipesByUser.find(ele => ele.name === recipeName)
                            this.handleRecipeComplete(index, recipe, "Wednesday")
                        }}
                        />
                      );
                    })}
                    <Row className="center-align">
                      <div
                        onClick={event => {
                          this.addNewRecipe("Wednesday");
                        }}
                      >
                        <i className="fas fa-plus-circle" />
                      </div>
                    </Row>
                  </Row>
                </Col>
                <Col className="plan-day-cell thursday-cell">
                  <Row className="cell-day-title center-align">Thursday</Row>
                  <Row>
                    {this.state.week.Thursday.map((ele, index) => {
                      return (
                        <Autocomplete
                          title="Recipe"
                          key={index}
                          className="plan-recipe-input"
                          data={this.props.recipesByUser.reduce((acc, ele) => {
                            acc[ele.name] = null;
                            return acc;
                          }, {})}
                          onChange={event => {
                            const recipe = this.props.recipesByUser.find(ele => ele.name === event.target.value);
                            if (recipe) {
                              this.handleRecipeComplete(index, recipe, "Thursday")
                            } 
                          }}
                          onAutocomplete={recipeName => {
                            console.log('name', recipeName)
                            const recipe = this.props.recipesByUser.find(ele => ele.name === recipeName)
                            this.handleRecipeComplete(index, recipe, "Thursday")
                        }}
                        />
                      );
                    })}
                    <Row className="center-align">
                      <div
                        onClick={event => {
                          this.addNewRecipe("Thursday");
                        }}
                      >
                        <i className="fas fa-plus-circle" />
                      </div>
                    </Row>
                  </Row>
                </Col>
                <Col className="plan-day-cell friday-cell">
                  <Row className="cell-day-title center-align">Friday</Row>
                  <Row>
                    {this.state.week.Friday.map((ele, index) => {
                      return (
                        <Autocomplete
                          title="Recipe"
                          key={index}
                          className="plan-recipe-input"
                          data={this.props.recipesByUser.reduce((acc, ele) => {
                            acc[ele.name] = null;
                            return acc;
                          }, {})}
                          onChange={event => {
                            const recipe = this.props.recipesByUser.find(ele => ele.name === event.target.value);
                            if (recipe) {
                              this.handleRecipeComplete(index, recipe, "Friday")
                            } 
                          }}
                          onAutocomplete={recipeName => {
                            console.log('name', recipeName)
                            const recipe = this.props.recipesByUser.find(ele => ele.name === recipeName)
                            this.handleRecipeComplete(index, recipe, "Friday")
                        }}
                        />
                      );
                    })}
                    <Row className="center-align">
                      <div
                        onClick={event => {
                          this.addNewRecipe("Friday");
                        }}
                      >
                        <i className="fas fa-plus-circle" />
                      </div>
                    </Row>
                  </Row>
                </Col>
                <Col className="plan-day-cell saturday-cell">
                  <Row className="cell-day-title center-align">Saturday</Row>
                  <Row>
                    {this.state.week.Saturday.map((ele, index) => {
                      return (
                        <Autocomplete
                          title="Recipe"
                          key={index}
                          className="plan-recipe-input"
                          data={this.props.recipesByUser.reduce((acc, ele) => {
                            acc[ele.name] = null;
                            return acc;
                          }, {})}
                          onChange={event => {
                            const recipe = this.props.recipesByUser.find(ele => ele.name === event.target.value);
                            if (recipe) {
                              this.handleRecipeComplete(index, recipe, "Saturday")
                            } 
                          }}
                          onAutocomplete={recipeName => {
                            console.log('name', recipeName)
                            const recipe = this.props.recipesByUser.find(ele => ele.name === recipeName)
                            this.handleRecipeComplete(index, recipe, "Saturday")
                        }}
                        />
                      );
                    })}
                    <Row className="center-align">
                      <div
                        onClick={event => {
                          this.addNewRecipe("Saturday");
                        }}
                      >
                        <i className="fas fa-plus-circle" />
                      </div>
                    </Row>
                  </Row>
                </Col>
              </Row>
              <Row className="save-plan-button">
                <Button>Save Meal Plan</Button>
              </Row>
            </form>
          </Row>
        </Row>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ plansByUser, recipesByUser }) => ({
  plansByUser,
  recipesByUser
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getAllPlansByUser, getAllRecipes }, dispatch);

export default withAuthentication(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Plans)
);
