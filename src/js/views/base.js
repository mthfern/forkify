export const classRef = {
    search: 'search',
    searchField: 'search__field',
    results: 'results',
    resultsList: 'results__list',
    resultsPages: 'results__pages',
    loader: 'loader',
    resultsLink: 'results__link',
    resultsFig: 'results__fig',
    resultsData: 'results__data',
    resultsName: 'results__name',
    resultsAuthor: 'results__author',
    resultsPagesBtn: 'btn-inline',
    resultsPagesBtnPrev: 'results__btn--prev',
    resultsPagesBtnNext: 'results__btn--next',
    searchIcon: 'search__icon',
    recipe: 'recipe',
    recipeFig: 'recipe__fig',
    recipeImg: 'recipe__img',
    recipeTitle: 'recipe__title',
    recipeDetails: 'recipe__details',
    recipeInfo: 'recipe__info',
    recipeIngredientList: 'recipe__ingredient-list',
    shoppingList: 'shopping__list',
  };

export const elements = {
  searchForm: document.querySelector(`.${classRef.search}`),
  searchField: document.querySelector(`.${classRef.searchField}`),
  results: document.querySelector(`.${classRef.results}`),
  resultsList: document.querySelector(`.${classRef.resultsList}`),
  resultsPages: document.querySelector(`.${classRef.resultsPages}`),
  recipe: document.querySelector(`.${classRef.recipe}`),
  shoppingList: document.querySelector(`.${classRef.shoppingList}`)
};

export const renderLoader = (parent) => {
  const loader = `
    <div class="${classRef.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;
  parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
  const loader = document.querySelector(`.${classRef.loader}`);
  if (loader) {
    loader.parentElement.removeChild(loader);
  }
};
