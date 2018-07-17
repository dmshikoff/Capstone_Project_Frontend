import React, { Component } from "react";
import { Row, Input, Button } from "react-materialize";
import { withAuthentication } from "../helpers";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getAllIngredientsUserPosseses,
  getAllIngredientsUsed,
  removeFromIngredient
} from "../actions/actions.js";

class RemoveIngredientForm extends Component {
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
          <h4>Remove Ingredients</h4>
        </Row>
        <Row className="ingredient-form-row">
          <form
            className="ingredient-form"
            onSubmit={event => {
              event.preventDefault();
              this.props.removeFromIngredient(
                this.props.authState.id,
                this.state,
                dispatch =>
                  dispatch(() =>
                    this.props.getAllIngredientsUserPosseses(
                      this.props.authState.id
                    )
                  )
              );
              this.setState({
                id: "",
                name: "",
                quantity: "",
                unit: ""
              });
            }}
          >
            <Input
              type="select"
              label="Ingredient Name"
              value={this.state.name}
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
            >
              <option value="" />
              {this.props.ingredientsByUser.map(ele => {
                return (
                  <option key={ele.id} value={ele.name}>
                    {ele.name}
                  </option>
                );
              })}
            </Input>
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
              type="select"
              value={this.state.unit}
              onChange={event => {
                this.setState({ unit: event.target.value });
              }}
            >
              <option value="empty" />
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
            <Button
              waves="light"
              className="remove-ingredient-button-form-submit"
            >
              Remove
            </Button>
          </form>
          <Row className="error-display">
            {this.props.errorMessage ? (
              <p>{this.props.errorMessage.message}</p>
            ) : null}
          </Row>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({
  ingredientsByUser,
  allIngredientsUsed,
  removedIngredient,
  errorMessage
}) => ({
  ingredientsByUser,
  allIngredientsUsed,
  removedIngredient,
  errorMessage
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getAllIngredientsUserPosseses,
      getAllIngredientsUsed,
      removeFromIngredient
    },
    dispatch
  );

export default withAuthentication(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RemoveIngredientForm)
);
