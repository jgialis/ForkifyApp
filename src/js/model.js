// This code will be the module in which we write our entire model.
import { API_URL, MAX_RESULTS } from './config.js';
import * as helpers from './helpers.js';
// Export this state to then be used in the controller.
export const state = {
  recipe: {},
  search: {
    results: [],
    resultsPerPage: MAX_RESULTS,
    page: 1,
  },
};

export const loadRecipe = async function (hashID) {
  try {
    const data = await helpers.getJSON(`${API_URL}/${hashID}`);
    const { recipe } = data.data;
    // MANUALLY FORMATTING DATA.
    state.recipe = {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };
  } catch (error) {
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await helpers.getJSON(`${API_URL}?search=${query}`);

    // Iterate over every array element and modify their property names.
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSearchResultsPage = function (page = state.search) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (servings) {
  // This function will reach into the state (recipe ingredients array)
  // and then change the quantity in each ingredient.
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity =
      ingredient.quantity * (servings / state.recipe.servings);
  });

  // To finish now update the servings in the state
  state.recipe.servings = servings;
};
