import axios from "axios";
import { request } from "../helpers/";
export const GET_INGREDIENTS_BY_USER = "GET_INGREDIENTS_BY_USER";
export const GET_RECIPES_BY_USER = "GET_RECIPES_BY_USER";
export const CREATE_NEW_RECIPE = "CREATE_NEW_RECIPE";
export const GET_ONE_RECIPE_BY_USER = "GET_ONE_RECIPE_BY_USER";
export const INGREDIENTS_BY_RECIPE = "INGREDIENTS_BY_RECIPE";
export const PLANS_BY_USER = "PLANS_BY_USER";
export const CREATE_NEW_OWNED_INGREDIENT = "CREATE_NEW_OWNED_INGREDIENT";
export const CREATE_NEW_PLAN = "CREATE_NEW_PLAN";
export const GET_ONE_PLAN = "GET_ONE_PLAN";
export const GET_PLANNED_RECIPES_BY_DAY = "GET_PLANNED_RECIPES_BY_DAY";
export const GET_ALL_INGREDIENTS_USED = "GET_ALL_INGREDIENTS_USED";
export const ADD_TO_INGREDIENTS = "ADD_TO_INGREDIENTS";

export const getAllIngredientsUserPosseses = userId => {
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

export const createNewOwnedIngredient = (user_id, { name, quantity, units }) => {
  return dispatch => {
    request(`/users/${user_id}/ingredients`, "post", {name, quantity, units})
      .then(response => {
        dispatch({
          type: CREATE_NEW_OWNED_INGREDIENT,
          payload: response.data.data
        });
      });
  };
};

export const getAllIngredientsUsed = (user_id) => {
  return dispatch => {
    request(`/users/${user_id}/ingredients/onHand`)
      .then(response => {
        dispatch({
          type: GET_ALL_INGREDIENTS_USED,
          payload: response.data.allIngredients
        })
      })
  }
}

export const addToIngredient = (user_id, ingredientInfo) => {
  return dispatch => {
    request(`/users/${user_id}/ingredients`, "post", {user_id, name: ingredientInfo.name, quantity: ingredientInfo.quantity, unit: ingredientInfo.unit, id: ingredientInfo.id})
      .then(response => {
        dispatch({
          type: ADD_TO_INGREDIENTS,
          payload: response.data.data
        })
      })
  }
}

export const getAllRecipes = userId => {
  return dispatch => {
    request(`/users/${userId}/recipes`).then(response => {
      dispatch({
        type: GET_RECIPES_BY_USER,
        payload: response.data.allRecipes
      });
    });
  };
};

export const getOneRecipe = (userId, recipeId) => {
  return dispatch => {
    request(`/users/${userId}/recipes/${recipeId}`).then(response => {
      dispatch({
        type: GET_ONE_RECIPE_BY_USER,
        payload: response.data.data
      });
    });
  };
};

export const createNewRecipe = (name, instructions, user_id, ingredientsArray, cb) => {
  return dispatch => {
    request(`/users/${user_id}/recipes`, "post", {
      name,
      instructions,
      user_id,
      ingredientsArray
    }).then(response => {
      dispatch({
        type: CREATE_NEW_RECIPE,
        payload: response.data
      });
      if (cb) cb();
    });
  };
};

export const getIngredientsByRecipe = (user_id, recipe_id) => {
  return dispatch => {
    request(`/users/${user_id}/recipes/${recipe_id}/ingredients`).then(
      response => {
        dispatch({
          type: INGREDIENTS_BY_RECIPE,
          payload: response.data.allIngredients
        });
      }
    );
  };
};

export const getAllPlansByUser = user_id => {
  return dispatch => {
    request(`/users/${user_id}/plans`).then(response => {
      dispatch({
        type: PLANS_BY_USER,
        payload: response.data.allPlans
      });
    });
  };
};

export const createNewPlan = (user_id, name, week, cb) => {
  return dispatch => {
    request(`/users/${user_id}/plans`, "post", { user_id, name, week }).then(
      response => {
        dispatch({
          type: CREATE_NEW_PLAN,
          payload: response.data.data
        });
        if (cb) cb();
      }
    );
  };
};

export const getOnePlan = (user_id, plan_id) => {
  return dispatch => {
    request(`/users/${user_id}/plans/${plan_id}`).then(response => {
      dispatch({
        type: GET_ONE_PLAN,
        payload: response.data.data
      });
    });
  };
};

export const getPlannedRecipesByDay = (user_id, plan_id) => {
  return dispatch => {
    request(`/users/${user_id}/plans/${plan_id}/recipes`).then(response => {
      dispatch({
        type: GET_PLANNED_RECIPES_BY_DAY,
        payload: response.data.data
      });
    });
  };
};
