import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView';

import 'core-js/stable'; //Polyfill everything
import 'regenerator-runtime/runtime'; // Polyfill async await
import * as model from './model.js';

const controlRecipes = async function () {
  try {
    // STEP 0: GET THE HASH ID
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.displayLoadingSpinner();
    // STEP 1: LOADING RECIPE
    await model.loadRecipe(id);
    // OBTAIN INFORMATION FROM THE STATE

    // STEP 2: BUILDING HTML STRING TO INSERT
    const { recipe } = model.state;
    console.log(recipe);
    recipeView.render(recipe);
  } catch (error) {
    recipeView.renderError();
  }
};
const controlSearchResults = async function (e) {
  e.preventDefault();
  try {
    resultsView.displayLoadingSpinner();

    // 1) Get Search Query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(searchView.getQuery());

    // 3) Render Results
    resultsView.render(model.getSearchResultsPage(1));

    // 4) Render initial pagination buttons.
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
};
const controlPagination = function (goToPage) {
  // 1) Render NEW Results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // 2) Render NEW pagination buttons.
  paginationView.render(model.state.search);
};
const controlServings = function (servings) {
  // 1) Update the recipe servings (in state)
  model.updateServings(servings);

  // 2) update the recipe view. (No need for
  //    buttonsView because they are already
  //    contained in recipeView.)
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
