import { combineReducers } from "redux";
import {
  GET_INGREDIENTS_BY_USER,
  GET_RECIPES_BY_USER,
  CREATE_NEW_RECIPE,
  GET_ONE_RECIPE_BY_USER,
  INGREDIENTS_BY_RECIPE,
  PLANS_BY_USER,
  CREATE_NEW_OWNED_INGREDIENT,
  CREATE_NEW_PLAN,
  GET_ONE_PLAN,
  GET_PLANNED_RECIPES_BY_DAY,
  GET_ALL_INGREDIENTS_USED,
  ADD_TO_INGREDIENTS,
  REMOVE_FROM_INGREDIENTS,
  ERR_MESSAGE,
  IMPLEMENT_PLAN,
  GROCERY_LIST
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

const newRecipe = (state = [], action) => {
  switch (action.type) {
    case CREATE_NEW_RECIPE:
      return action.payload;
    default:
      return state;
  }
};

const ingredientsByRecipe = (state = [], action) => {
  switch (action.type) {
    case INGREDIENTS_BY_RECIPE:
      return action.payload;
    default:
      return state;
  }
};

const plansByUser = (state = [], action) => {
  switch (action.type) {
    case PLANS_BY_USER:
      return action.payload;
    default:
      return state;
  }
};

const createUserOwnedIngredient = (state = [], action) => {
  switch (action.type) {
    case CREATE_NEW_OWNED_INGREDIENT:
      return action.payload;
    default:
      return state;
  }
};

const newPlan = (state = [], action) => {
  switch (action.type) {
    case CREATE_NEW_PLAN:
      return action.payload;
    default:
      return state;
  }
};

const onePlan = (state = [], action) => {
  switch (action.type) {
    case GET_ONE_PLAN:
      return action.payload;
    default:
      return state;
  }
};

const plannedRecipesByDay = (state = [], action) => {
  switch (action.type) {
    case GET_PLANNED_RECIPES_BY_DAY:
      return action.payload;
    default:
      return state;
  }
};

const allIngredientsUsed = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_INGREDIENTS_USED:
      return action.payload;
    default:
      return state;
  }
}

const addedIngredient = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_INGREDIENTS:
      return action.payload;
    default:
      return state;
  }
}

const removedIngredient = (state = [], action) => {
  switch (action.type) {
    case REMOVE_FROM_INGREDIENTS:
      return action.payload;
    default:
      return state;
  }
}

const errorMessage = (state = [], action) => {
  switch (action.type) {
    case ERR_MESSAGE:
      return action.payload;
    default:
      return state;
  }
}

const groceryList = (state = [], action) => {
  switch (action.type) {
    case GROCERY_LIST:
      return action.payload;
    default:
      return state;
  }
}

const implementedPlan = (state = [], action) => {
  switch (action.type) {
    case IMPLEMENT_PLAN:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  ingredientsByUser,
  recipesByUser,
  newRecipe,
  oneRecipeByUser,
  ingredientsByRecipe,
  plansByUser,
  createUserOwnedIngredient,
  newPlan,
  onePlan,
  plannedRecipesByDay,
  allIngredientsUsed,
  addedIngredient,
  removedIngredient,
  errorMessage,
  groceryList,
  implementedPlan
});
