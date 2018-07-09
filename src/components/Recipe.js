import React, { Component } from "react";
import { connect } from "react-redux";
import { withAuthentication } from "../helpers";
import { bindActionCreators } from "redux";
import { getOneRecipe, getIngredientsByRecipe } from "../actions/actions";
import { Row, Col } from "react-materialize";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../styling/Recipe.css";

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    this.props.getOneRecipe(
      this.props.authState.id,
      this.props.match.params.id
    );
    this.props.getIngredientsByRecipe(
      this.props.authState.id,
      this.props.match.params.id
    );
  };

  render() {
    return (
      <div>
        <Navbar />
        <Row className="complete-recipe-row">
          <Row className="center-align">
            <h2>{this.props.oneRecipeByUser.name}</h2>
          </Row>
          <div className="divider" />
          <Row className="center-align">
          <h4>Ingredients</h4>
            <ul>
              {this.props.ingredientsByRecipe.map(ele => {
                return <li key={ele.name}>{ele.quantity}{" "}{ele.units}{" "}{ele.name}</li>;
              })}
            </ul>
          </Row>
          <Row className="recipe-instruction-row">
          <Col className="recipe-instruction-col">
          {this.props.oneRecipeByUser.instructions}      
          </Col> 
          </Row>
        </Row>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ oneRecipeByUser, ingredientsByRecipe }) => ({
  oneRecipeByUser,
  ingredientsByRecipe
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getOneRecipe, getIngredientsByRecipe }, dispatch);

export default withAuthentication(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Recipe)
);
