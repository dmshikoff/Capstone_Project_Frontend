import { combineReducers } from "redux";
import {
  GET_INGREDIENTS_BY_USER,
  GET_RECIPES_BY_USER,
  CREATE_NEW_RECIPE,
  GET_ONE_RECIPE_BY_USER,
  INGREDIENTS_BY_RECIPE,
  PLANS_BY_USER,
  CREATE_NEW_OWNED_INGREDIENT
} from "../actions/actions.js";

const ingredientsByUser = (state = [], action) => {
  switch (action.type) {
    case GET_INGREDIENTS_BY_USER:
      return action.payload;
    default:
      return state;
  }
};

const recipesByUser = (state = [], action) => {
  switch (action.type) {
    case GET_RECIPES_BY_USER:
      return action.payload;
    default:
      return state;
  }
};

const oneRecipeByUser = (state = [], action) => {
  switch (action.type) {
    case GET_ONE_RECIPE_BY_USER:
      return action.payload;
    default:
      return state;
  }
};

const createNewRecipe = (state = [], action) => {
  switch (action.type) {
    case CREATE_NEW_RECIPE:
      return action.payload;
    default:
      return state;
  }
}

const ingredientsByRecipe = (state = [], action) => {
  switch (action.type) {
    case INGREDIENTS_BY_RECIPE:
      return action.payload;
    default:
      return state;
  }
}

const plansByUser = (state = [], action) => {
  switch (action.type) {
    case PLANS_BY_USER:
      return action.payload;
    default:
      return state;
  }
}

const createUserOwnedIngredient = (state = [], action) => {
  switch (action.type) {
    case CREATE_NEW_OWNED_INGREDIENT:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  ingredientsByUser,
  recipesByUser,
  createNewRecipe,
  oneRecipeByUser,
  ingredientsByRecipe,
  plansByUser,
  createUserOwnedIngredient
});

