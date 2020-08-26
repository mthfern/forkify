import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import { elements, classRef, renderLoader, clearLoader } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';

/*************************************************************************
 *
 * GLOBAL STATE
 *
 *************************************************************************/

const state = {
  //global state
};

// testing only
window.state = state;

/*************************************************************************
 *
 * SEARCH CONTROL
 *
 *************************************************************************/

const controlSearch = async () => {
  // 1. get query
  const query = searchView.getInput();

  if (query) {
    // 2. New search object
    state.search = new Search(query);

    // 3. Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.results);

    try {
      // 4. Search recipes
      await state.search.getResults();

      // 5. Display results on UI
      searchView.renderResultsList(state.search.recipes);
    } catch (error) {
      alert(state.search.error);
    }

    // 6. Clear loader
    clearLoader();
  }
};

/*************************************************************************
 *
 * RECIPE CONTROL
 *
 *************************************************************************/

const controlRecipe = async () => {
  const recipeId = window.location.hash.split('#').pop();

  if (recipeId) {
    // Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // Highlight recipe
    recipeView.highlightSelected(recipeId);

    // Create new recipe obj
    state.recipe = new Recipe(recipeId);

    try {
      // Get recipe data
      await state.recipe.getResults();
      state.recipe.parseIngredients();

      // Calculate time and servings
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      recipeView.renderRecipe(state.recipe);
    } catch (error) {
      alert(state.recipe.error);
    }

    clearLoader();
  }
};

/*************************************************************************
 *
 * LIST CONTROL
 *
 *************************************************************************/
const controlList = () => {
  // Create new List
  if (!state.List) state.list = new List();

  // Add ingredients
  state.recipe.ingredients.forEach((el) => {
    listView.renderItem(state.list.addItem(el.count, el.unit, el.ingredient));
  });
};

/**********************************************************************
 *
 * EVENT LISTENERS
 *
 **********************************************************************/

// Search button
elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  controlSearch();
});

// Recipe list page buttons
elements.resultsPages.addEventListener('click', (e) => {
  const element = e.target.closest(`.${classRef.resultsPagesBtn}`);
  if (element) {
    searchView.clearResults();
    searchView.renderResultsList(
      state.search.recipes,
      parseInt(element.dataset.goto, 10)
    );
  }
});

// Recipe list click / page load event
['hashchange', 'load'].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);

// Increase/decrease servings buttons
elements.recipe.addEventListener('click', (e) => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServings(state.recipe);
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    state.recipe.updateServings('inc');
    recipeView.updateServings(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    controlList();
  }
});
