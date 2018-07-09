import React, { Component } from "react";
import { Row, Input, Button, Autocomplete } from "react-materialize";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getAllRecipes,
  getAllIngredients,
  createNewRecipe,
  getOneRecipe
} from "../actions/actions";
import { withAuthentication } from "../helpers";
import Navbar from "./Navbar";
import Footer from "./Footer";

import "../styling/Cookbook.css";

class Cookbook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      ingredients: [{ qty: "", unit: "", name: "" }],
      instructions: ""
    };
  }

  componentDidMount = () => {
    this.props.getAllRecipes(this.props.authState.id);
    this.props.getAllIngredients(this.props.authState.id);
  };

  addNewIngredient = () => {
    this.setState({
      ingredients: [...this.state.ingredients, { qty: "", unit: "", name: "" }]
    });
  };

  handleNameChange = (index, key, value) => {
    const ingredients = this.state.ingredients.map((ele, i) => {
      if (i === index) {
        return { ...ele, [key]: value };
      } else {
        return { ...ele };
      }
    });

    this.setState({ ingredients });
  };

    handleNameAutoComplete = (index, ingredient) => {
        // console.log(id, ingredient, ingredient.name)
        const ingredients = this.state.ingredients.map((ele, i) => {
            // console.log('element', ele, id, i)
            if (i === index) {
              return { ...ele, name: ingredient.name, id: ingredient.id };
            } else {
              return { ...ele };
            }
          });
      
          this.setState({ ingredients });
    }

  render() {
    return (
      <div>
        <Navbar />
        <Row className="cookbook-row">
          <Row className="center-align">
            <h2>Your Cookbook</h2>
          </Row>
          <div className="divider" />
          <Row className="recipe-row">
            <ul id="triple">
              {this.props.recipesByUser.map(ele => {
                return (
                  <li className="horizontal-list-item" key={ele.id} value={ele.id}
                  onClick={event => {
                    this.props.getOneRecipe(this.props.authState.id, event.target.value);
                    this.props.history.push(`/Recipe/${ele.id}`)
                  }}
                  >
                    {ele.name}
                  </li>
                );
              })}
            </ul>
          </Row>
          <div className="divider" />
          <Row className="center-align">
            <h4>Add a New Recipe</h4>
          </Row>

          <Row className="cookbook-form-row">
            <form
              className="cookbook-form"
              onSubmit={event => {
                event.preventDefault();
                this.props.createNewRecipe(
                  this.state.name,
                  this.state.instructions,
                  this.props.authState.id,
                  this.state.ingredients,
                  function(){
                    this.props.getAllRecipes(this.props.authState.id);
                  }
                )
              }}
            >
              <Input
                value={this.state.name}
                onChange={event => {
                  this.setState({ name: event.target.value });
                }}
                type="text"
                label="Recipe Name"
              />
              {this.state.ingredients.map((ele, index) => {
                return (
                  <Row key={index}>
                    <Input
                      type="number"
                      value={ele.qty}
                      onChange={event =>
                        this.handleNameChange(index, "qty", event.target.value)
                      }
                      label="Qty"
                    />
                    <Input
                      type="select"
                      value={ele.unit}
                      label="Unit"
                      onChange={event =>
                        this.handleNameChange(index, "unit", event.target.value)
                      }
                    >
                      <option value="ounce(s)">ounce(s)</option>
                      <option value="fluid ounce(s)">fluid ounce(s)</option>
                      <option value="cup(s)">cup(s)</option>
                      <option value="pint(s)">pint(s)</option>
                      <option value="quart(s)">quart(s)</option>
                      <option value="gallon(s)">gallon(s)</option>
                    </Input>
                    <Autocomplete
                        title="Ingredient"
                        data={this.props.ingredientsByUser.reduce((acc, ele) => {
                            acc[ele.name] = null
                            return acc
                        }, {})}
                        onChange={event => {
                            const ingredient = this.props.ingredientsByUser.find(ele => ele.name === event.target.value)
                            if(ingredient){
                                this.handleNameAutoComplete(index, ingredient)    
                            }
                            else if (event.target.value) {
                                this.handleNameChange(index,'name', event.target.value)
                            }
                        }}
                        onAutocomplete={ingredientName => {
                            console.log('name', ingredientName)
                            const ingredient = this.props.ingredientsByUser.find(ele => ele.name === ingredientName)
                            this.handleNameAutoComplete(index, ingredient)
                        }}
                    />
                  </Row>
                );
              })}
              <div onClick={this.addNewIngredient}>+</div>
              <Input
                value={this.state.instructions}
                onChange={event => {
                  this.setState({ instructions: event.target.value });
                }}
                type="textarea"
                label="Instructions"
              />
              <Row className="recipe-button-row">
                <Button>Create Recipe</Button>
              </Row>
            </form>
          </Row>
        </Row>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ recipesByUser, ingredientsByUser, oneRecipeByUser }) => ({
  recipesByUser,
  ingredientsByUser,
  oneRecipeByUser
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getAllRecipes, getAllIngredients, createNewRecipe, getOneRecipe },
    dispatch
  );

export default withAuthentication(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Cookbook)
);
