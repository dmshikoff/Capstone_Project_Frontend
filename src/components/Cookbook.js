import React, { Component } from "react";
import { Row, Input } from "react-materialize";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAllRecipes } from "../actions/actions";
import { withAuthentication } from "../helpers";
import Navbar from "./Navbar";
import Footer from "./Footer";

import "../styling/Cookbook.css";

class Cookbook extends Component {
  constructor(props) {
    super(props);

    this.state = {
        name:'',
        ingredients: [{qty:'', unit:'', name:''}],
        instructions: ''
    };
  }

  componentDidMount = () => {
    this.props.getAllRecipes(this.props.authState.id);
  };
  addNewIngredient = () => {
    this.setState({ingredients: [...this.state.ingredients, {qty:'', unit:'', name:''}] })
  }
  handleNameChange = (id, value) => {
      const ingredients = this.state.ingredients.map((ele, i) => {
          if(i === id) {
              return {...ele, name: value}
          }
          else {
              return {...ele}
          }
      })

      this.setState({ingredients})
  }
  render() {
      console.log(this.state)
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
                  <li className="horizontal-list-item" key={ele.id}>
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
            <form className="cookbook-form">
                <Input value={this.state.name} onChange={_=>_} type="text" label="Recipe Name" />
                {
                    this.state.ingredients.map((ele,id) => {
                        return (
                            <Row key={id}>
                                <Input type="number" value={ele.qty} label="Qty" />
                                <Input type="select" value={ele.unit} label="Unit">
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                                </Input>
                                <Input type="text" 
                                    value={ele.name} 
                                    onChange={(event) => this.handleNameChange(id, event.target.value)} 
                                    label="Name" />
                            </Row>
                        )
                    })
                }
                <div onClick={this.addNewIngredient}>+</div>
                <Input value={this.state.instructions} onChange={_=>_} type="textarea" label="Instructions" />
            </form>
          </Row>
        </Row>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = ({ recipesByUser }) => ({ recipesByUser });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getAllRecipes }, dispatch);

export default withAuthentication(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Cookbook)
);
