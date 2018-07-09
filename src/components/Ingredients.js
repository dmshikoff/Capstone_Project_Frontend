import React, { Component } from "react";
import { Row, Button, Modal } from "react-materialize";
import { withAuthentication } from "../helpers";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllIngredientsUserPosseses } from "../actions/actions.js";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AddIngredientForm from "./AddIngredientForm";
import RemoveIngredientForm from "./RemoveIngredientForm";
import "../styling/Ingredients.css";
import info from "../images/info-circle.svg";


class Ingredients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addIngredients: true
    };
  }

  componentDidMount = () => {
    this.props.getAllIngredientsUserPosseses(this.props.authState.id);
  };

  render() {
    return (
      <div>
        <Navbar />
        <Row className="pantry-row">
          <Row className="center-align">
            <h2>Your Pantry</h2>
            <div className="divider" />
          </Row>
          <Row className="ingredient-row">
            <ul id="triple">
              {this.props.ingredientsByUser.map(ele => {
                return (
                  <li className="horizontal-list-item" key={ele.id}>
                    {ele.quantity} {ele.units}{" "}
                    <span className="bold-text">{ele.name}</span>
                  </li>
                );
              })}
            </ul>
          </Row>
          <div className="divider" />
          <Row className="ingredient-button-row">
                <Button waves="light" className="add ingredient-button"
                onClick={event => {
                  this.setState({addIngredients : true})
                }}
                >
                  Add
                </Button>
                <Button waves="light" className="remove ingredient-button"
                onClick={event => {
                  this.setState({addIngredients : false})
                }}
                >
                  Remove
                </Button>
                <Modal
              header="Add/Remove Ingredient Help"
              trigger={<img className="info-img" src={info} alt="info" />}
            >
              <ol>
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
          {this.state.addIngredients ? <AddIngredientForm /> : <RemoveIngredientForm />}
        </Row>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ ingredientsByUser }) => ({ ingredientsByUser });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getAllIngredientsUserPosseses }, dispatch);

export default withAuthentication(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Ingredients)
);
