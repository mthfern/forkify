import { elements, classRef } from './base';
import { Fraction } from 'fractional';

/********************************************************************************/
// Functions
/********************************************************************************/
const formatCount = (count) => {
  if (count) {
    const [int, dec] = count
      .toString()
      .split('.')
      .map((el) => parseInt(el, 10));

    if (!dec) {
      return int;
    }

    if (int === 0) {
      const fr = new Fraction(count);
      return `${fr.numerator}/${fr.denominator}`;
    } else {
      const fr = new Fraction(count - int);
      return `${int} ${fr.numerator}/${fr.denominator}`;
    }
  }

  return '?';
};

/********************************************************************************/
// Exports
/********************************************************************************/
export const clearRecipe = () => (elements.recipe.innerHTML = '');

export const highlightSelected = (id) => {
  // remove highlights
  const resList = document.querySelectorAll('.results__link');
  for (let el of resList) {
    el.classList.remove('results__link--active');
  }

  // highlight selected
  const resultsRecipe = document.querySelector(`a[href*='${id}']`);
  if (resultsRecipe) {
    resultsRecipe.classList.add('results__link--active');
  }
};

export const renderRecipe = (recipe) => {
  const innerHTML = `
        <figure class="recipe__fig">
            <img src="${recipe.image_url}" alt="${
    recipe.title
  }" class="recipe__img">
            <h1 class="recipe__title">
                <span>${recipe.title}</span>
            </h1>
        </figure>

        <div class="recipe__details">
            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-stopwatch"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${
                  recipe.time
                }</span>
                <span class="recipe__info-text"> minutes</span>
            </div>

            <div class="recipe__info">
                <svg class="recipe__info-icon">
                    <use href="img/icons.svg#icon-man"></use>
                </svg>

                <span class="recipe__info-data recipe__info-data--people">${
                  recipe.servings
                }</span>
                <span class="recipe__info-text"> servings</span>

                <div class="recipe__info-buttons">
                    <button class="btn-tiny btn-decrease">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-minus"></use>
                        </svg>
                    </button>
                    <button class="btn-tiny btn-increase">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-plus"></use>
                        </svg>
                    </button>
                </div>
            </div>

            <button class="recipe__love">
                <svg class="header__likes">
                    <use href="img/icons.svg#icon-heart-outlined"></use>
                </svg>
            </button>
        </div>

        <div class="recipe__ingredients">
            <ul class="recipe__ingredient-list">
            ${recipe.ingredients
              .map(
                (el) => `
                <li class="recipe__item">
                    <svg class="recipe__icon">
                        <use href="img/icons.svg#icon-check"></use>
                    </svg>
                    <div class="recipe__count">${formatCount(el.count)}</div>
                    <div class="recipe__ingredient">
                        <span class="recipe__unit">${el.unit}</span>
                        ${el.ingredient}
                    </div>
                </li>
            `
              )
              .join('')}
            </ul>

            <button class="btn-small recipe__btn recipe__btn--add">
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-shopping-cart"></use>
                </svg>
                <span>Add to shopping list</span>
            </button>
        </div>

        <div class="recipe__directions">
            <h2 class="heading-2">How to cook it</h2>
            <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__by">${
                  recipe.publisher
                }</span>. Please check out directions at their website.
            </p>
            <a class="btn-small recipe__btn" href="${
              recipe.source_url
            }" target="_blank">
                <span>Directions</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>

            </a>
        </div>
`;
  elements.recipe.insertAdjacentHTML('afterbegin', innerHTML);
};

export const updateServings = (recipe) => {
  // update servings
  document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

  // update ingredients count
  const countList = [...document.querySelectorAll('.recipe__count')];
  countList.forEach((item, index)=>{
    item.textContent = formatCount(recipe.ingredients[index].count);
  });
};
