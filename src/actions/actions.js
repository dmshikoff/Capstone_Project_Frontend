import axios from "axios";
import { request } from "../helpers/"
export const GET_INGREDIENTS_BY_USER = "GET_INGREDIENTS_BY_USER";
export const GET_RECIPES_BY_USER = "GET_RECIPES_BY_USER";

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
