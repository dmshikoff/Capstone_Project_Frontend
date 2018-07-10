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
          <h4>Add Ingredients</h4>
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
              defaultValue="1"
              onChange={event => {
                this.setState({ unit: event.target.value });
              }}
            >
              <option value="ounce(s)">ounce(s)</option>
              <option value="fluid ounce(s)">fluid ounce(s)</option>
              <option value="cup(s)">cup(s)</option>
              <option value="pint(s)">pint(s)</option>
              <option value="quart(s)">quart(s)</option>
              <option value="gallon(s)">gallon(s)</option>
              <option value="count">count</option>
            </Input>
            <Button className="remove-ingredient-button-form-submit">Remove</Button>
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
