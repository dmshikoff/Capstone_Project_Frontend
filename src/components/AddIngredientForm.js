import React, { Component } from "react";
import { Row, Input, Button, Autocomplete } from "react-materialize";
import { withAuthentication } from "../helpers";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  createNewOwnedIngredient,
  getAllIngredientsUserPosseses,
  getAllIngredientsUsed,
  addToIngredient
} from "../actions/actions.js";

class AddIngredientForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      quantity: "",
      unit: ""
    };
  }

  componentDidMount = () => {
    this.props.getAllIngredientsUserPosseses(this.props.authState.id);
    this.props.getAllIngredientsUsed(this.props.authState.id);
  };

  render() {
    return (
      <div>
        <Row className="center-align ingredient-title-row">
          <h4>Add Ingredients</h4>
        </Row>
        <Row className="ingredient-form-row">
          <form
            className="ingredient-form"
            onSubmit={event => {
              event.preventDefault();
              this.props.addToIngredient(
                this.props.authState.id,
                this.state,
                (dispatch) => dispatch(() => this.props.getAllIngredientsUserPosseses(
                    this.props.authState.id
                  ))
              );
              this.setState({
                id: "",
                name: "",
                quantity: "",
                unit: ""
              });
            }}
          >
            <Autocomplete
              title="Ingredient Name"
              type="text"
              value={this.state.name}
              data={this.props.allIngredientsUsed.reduce((acc, ele) => {
                acc[ele.name] = null;
                return acc;
              }, {})}
              onChange={event => {
                if (event.target.value !== undefined) {
                  const i = this.props.allIngredientsUsed.find(
                    e => e.name === event.target.value
                  );
                  if (i) {
                    this.setState({ name: i.name, id: i.id });
                  } else {
                    this.setState({ name: event.target.value, id: undefined });
                  }
                }
              }}
              onAutocomplete={ingredientName => {
                const i = this.props.allIngredientsUsed.find(
                  e => e.name === ingredientName
                );
                this.setState({ name: i.name, id: i.id });
              }}
            />
            <Input
              label="Quantity"
              type="number"
              value={this.state.quantity}
              onChange={event => {
                this.setState({ quantity: event.target.value });
              }}
            />
            <Input
              label="Unit"
              value={this.state.unit}
              type="select"
              onChange={event => {
                this.setState({ unit: event.target.value });
              }}
            >
              <option value="empty"/>
              <option value="ml">milliliter(s)/ml</option>
              <option value="l">liter(s)/l</option>
              <option value="fl-oz">fluid ounce(s)/fl-oz</option>
              <option value="tsp">teaspoon(s)/tsp</option>
              <option value="Tbs">Tablespoon(s)/Tbsp</option>
              <option value="cup">cup(s)/cp</option>
              <option value="pnt">pint(s)/pt</option>
              <option value="qt">quart(s)/q</option>
              <option value="gal">gallon(s)/gal</option>
              <option value="count">count</option>
            </Input>
            <Button waves="light" className="add-ingredient-button-form-submit">
              Add
            </Button>
          </form>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({
  createUserOwnedIngredient,
  ingredientsByUser,
  allIngredientsUsed,
  addedIngredient
}) => ({
  createUserOwnedIngredient,
  ingredientsByUser,
  allIngredientsUsed,
  addedIngredient
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createNewOwnedIngredient,
      getAllIngredientsUserPosseses,
      getAllIngredientsUsed,
      addToIngredient
    },
    dispatch
  );

export default withAuthentication(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddIngredientForm)
);
