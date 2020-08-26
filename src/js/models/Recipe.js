import axios from 'axios';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getResults() {
    try {
      const result = await axios(
        `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
      );

      this.image_url = result.data.recipe.image_url;
      this.ingredients = result.data.recipe.ingredients;
      this.publisher = result.data.recipe.publisher;
      this.publisher_url = result.data.recipe.publisher_url;
      this.social_rank = result.data.recipe.social_rank;
      this.source_url = result.data.recipe.source_url;
      this.title = result.data.recipe.title;
    } catch (error) {
      this.error = "Couldn't find the recipe!";
    }
  }

  calcTime() {
    const totalIng = this.ingredients.length;
    const periods = Math.ceil(totalIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = [
      'tablespoons',
      'tablespoon',
      'ounces',
      'ounce',
      'teaspoons',
      'teaspoon',
      'cups',
      'pounds',
    ];
    const unitsShort = [
      'tbsp',
      'tbsp',
      'oz',
      'oz',
      'tsp',
      'tsp',
      'cup',
      'pound',
    ];
    const units = [...unitsShort, 'kg', 'g'];

    const newIngredients = this.ingredients.map((el) => {
      let count, unit, ingredient;

      ingredient = el.toLowerCase();

      // 1. Uniform units
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      // 2. Remove parenthesis
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ').trim();

      // 3. Parse ingredients into count, unit and ingredient
      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex((el2) => units.includes(el2));

      if (unitIndex > -1) {
        // has unit
        // assume that everything before unit is the count
        const arrCount = arrIng
          .slice(0, unitIndex)
          .map((el3) => eval(el3.replace(/-/g, '+')));

        count = arrCount.reduce((acc, cur) => acc + cur);
        unit = arrIng[unitIndex];
        ingredient = arrIng.slice(unitIndex + 1).join(' ');
      } else if (parseFloat(arrIng[0])) {
        // no unit, first is number

        count = parseFloat(arrIng[0]);
        unit = '';
        ingredient = arrIng.slice(1).join(' ');
      } else {
        // no unit, first not a number

        count = 1;
        unit = '';
      }

      const objIng = {
        count,
        unit,
        ingredient,
      };

      return objIng;
    });

    this.ingredients = newIngredients;
  }

  updateServings(type) {
    // Servings
    const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

    // Ingredients
    this.ingredients.forEach(
      (ing) => (ing.count *= newServings / this.servings)
    );

    this.servings = newServings;
  }
}
