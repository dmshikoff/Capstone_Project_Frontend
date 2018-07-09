import axios from "axios";
import { request } from "../helpers/"
export const GET_INGREDIENTS_BY_USER = "GET_INGREDIENTS_BY_USER";
export const GET_RECIPES_BY_USER = "GET_RECIPES_BY_USER";
export const CREATE_NEW_RECIPE = "CREATE_NEW_RECIPE";

export const getAllIngredients = userId => {
  return dispatch => {
    axios
      .get(`http://localhost:5000/users/${userId}/ingredients`)
      .then(response => {
        dispatch({
          type: GET_INGREDIENTS_BY_USER,
          payload: response.data.allIngredients
        });
      });
  };
};

export const getAllRecipes = userId => {
  return dispatch => {
    request(`/users/${userId}/recipes`)
    .then(response => {
      dispatch({
        type: GET_RECIPES_BY_USER,
        payload: response.data.allRecipes
      })
    })
  }
}

export const createNewRecipe = (name, instructions, user_id, ingredientsArray) => {
  return dispatch => {
    request(`/users/${user_id}/recipes`, "post", {name, instructions, user_id, ingredientsArray})
    .then(response => {
      dispatch({
        type: CREATE_NEW_RECIPE,
        payload: response.data
      })
    })
  }
}
