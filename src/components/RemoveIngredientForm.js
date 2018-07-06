import React from "react";
import { Row, Input } from "react-materialize";


const RemoveIngredientForm = () => {
    return (
        <div>
        <Row className="center-align ingredient-title-row">
            <h4>Remove Ingredients</h4>
          </Row>
          <Row className="ingredient-form-row">
            <form className="ingredient-form">
              <Input label="Ingredient Name" />
              <Input label="Quantity" />
              <Input label="Unit" type="select">
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
              </Input>
            </form>
          </Row>
        </div>
    )
}

export default RemoveIngredientForm;