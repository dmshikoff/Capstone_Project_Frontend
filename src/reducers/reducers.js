import { combineReducers } from "redux";
import { GET_INGREDIENTS_BY_USER, GET_RECIPES_BY_USER } from "../actions/actions.js"

const ingredientsByUser = (state = [], action) => {
  switch(action.type){
    case GET_INGREDIENTS_BY_USER:
      return action.payload;
    default:
      return state;
  }
}

const recipesByUser = (state = [], action) => {
  switch(action.type){
    case GET_RECIPES_BY_USER:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
    ingredientsByUser,
    recipesByUser
  });