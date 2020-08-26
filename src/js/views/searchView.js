import { elements, classRef } from './base';

/********************************************************************************/
// Exports
/********************************************************************************/

export const getInput = () => elements.searchField.value;

export const clearInput = () => (elements.searchField.value = '');

export const clearResults = () => {
  elements.resultsList.innerHTML = '';
  elements.resultsPages.innerHTML = '';
};

export const renderResultsList = (results, page = 1, itensPerPage = 10) => {
  // Define result list scope
  const start = (page - 1) * itensPerPage,
    end = page * itensPerPage,
    numPages = Math.ceil(results.length / itensPerPage);

  // Add recipes into result list
  results.slice(start, end).forEach(renderRecipe);

  // Add navigation buttons
  renderResultsButtons(page, numPages);
};

/********************************************************************************/
// Functions
/********************************************************************************/

const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(/-| /).reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newTitle.join(' ')} ...`;
  } else {
    return title;
  }
};

const renderRecipe = (recipe) => {
  const itemHTML = `
    <li>
        <a class="${classRef.resultsLink}" href="#${recipe.recipe_id}">
            <figure class="${classRef.resultsFig}">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="${classRef.resultsData}">
                <h4 class="${classRef.resultsName}">${limitRecipeTitle(
    recipe.title
  )}</h4>
                <p class="${classRef.resultsAuthor}">${recipe.publisher}</p>
            </div>
        </a>
    </li>    
`;

  elements.resultsList.insertAdjacentHTML('beforeend', itemHTML);
};

// type: prev, next
const buildButton = (page, type) => {
  const btnType =
    type === 'prev'
      ? classRef.resultsPagesBtnPrev
      : classRef.resultsPagesBtnNext;
  const data_goto = type === 'prev' ? page - 1 : page + 1;
  const label = `Page ${type === 'prev' ? page - 1 : page + 1}`;

  return `
  <button class="${classRef.resultsPagesBtn} ${btnType}" data-goto=${data_goto}>
      <span>${label}</span>
      <svg class="${classRef.searchIcon}">
          <use href="img/icons.svg#icon-triangle-${
            type === 'prev' ? 'left' : 'right'
          }"></use>
      </svg>
  </button>
`;
};

const renderResultsButtons = (page, numPages) => {
  let buttonsHTML;

  if (page === 1 && numPages > 1) {
    // only next
    buttonsHTML = buildButton(page, 'next');
  } else if (page < numPages) {
    // prev and next
    buttonsHTML = `
      ${buildButton(page, 'prev')}
      ${buildButton(page, 'next')}
      `;
  } else {
    // only prev
    buttonsHTML = buildButton(page, 'prev');
  }
  elements.resultsPages.insertAdjacentHTML('afterbegin', buttonsHTML);
};
