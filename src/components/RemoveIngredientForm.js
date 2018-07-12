import React, { Component } from "react";
import { Row, Input, Button, Autocomplete } from "react-materialize";
import { withAuthentication } from "../helpers";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getAllIngredientsUserPosseses
} from "../actions/actions.js";

class RemoveIngredientForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      quantity: "",
      unit: ""
    };
  }

  componentDidMount = () => {
    this.props.getAllIngredientsUserPosseses(this.props.authState.id);
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
            }}
          >
            <Autocomplete
              title="Ingredient Name"
              data={this.props.ingredientsByUser.reduce((acc, ele) => {
                acc[ele.name] = null;
                return acc;
              }, {})}
              
            />
            <Input
              label="Quantity"
              value={this.state.quantity}
              onChange={event => {
                this.setState({ quantity: event.target.value });
              }}
            />
            <Input
              label="Unit"
              type="select"
              defaultValue="empty"
              onChange={event => {
                this.setState({ unit: event.target.value });
              }}
            >
              <option value="empty" label="disabled" disabled></option>
              <option value="milliliter(s)/ml">milliliter(s)/ml</option>
              <option value="liter(s)/l">liter(s)/l</option>
              <option value="fluid ounce(s)/fl-oz">fluid ounce(s)/fl-oz</option>
              <option value="teaspoon(s)/tsp">teaspoon(s)/tsp</option>
              <option value="Tablespoon(s)/Tbsp">Tablespoon(s)/Tbsp</option>
              <option value="cup(s)/cp">cup(s)/cp</option>
              <option value="pint(s)/pt">pint(s)/pt</option>
              <option value="quart(s)/qt">quart(s)/q</option>
              <option value="gallon(s)/gal">gallon(s)/gal</option>
              <option value="count">count</option>
            </Input>
            <Button waves="light" className="remove-ingredient-button-form-submit">Remove</Button>
          </form>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ ingredientsByUser }) => ({
  ingredientsByUser
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getAllIngredientsUserPosseses },
    dispatch
  );

export default withAuthentication(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RemoveIngredientForm)
);
