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
    console.log(this.props.addedIngredient)
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
              this.props.addToIngredient(this.props.authState.id, this.state)
            }}
          >
            <Autocomplete
              title="Ingredient Name"
              data={this.props.allIngredientsUsed.reduce((acc, ele) => {
                acc[ele.name] = null;
                return acc;
              }, {})}
              onChange = {event => {
                if(event.target.value !== undefined){
                  const i = this.props.allIngredientsUsed.find(e => e.name === event.target.value)
                  if(i){
                    this.setState({name: i.name, id: i.id})    
                  }
                  else {
                    this.setState({name:event.target.value, id:undefined})
                  }
                }
              }}
              onAutocomplete = {ingredientName => {
                const i = this.props.allIngredientsUsed.find(e => e.name === ingredientName)
                this.setState({name: i.name, id: i.id})
              }}
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
            <Button waves="light" className="add-ingredient-button-form-submit">Add</Button>
          </form>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ createUserOwnedIngredient, ingredientsByUser, allIngredientsUsed, addedIngredient }) => ({
  createUserOwnedIngredient,
  ingredientsByUser,
  allIngredientsUsed,
  addedIngredient
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { createNewOwnedIngredient, getAllIngredientsUserPosseses, getAllIngredientsUsed, addToIngredient },
    dispatch
  );

export default withAuthentication(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddIngredientForm)
);
