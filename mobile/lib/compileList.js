const compileList = (meals) => {
  const result = {};
  const list = [];
  const recipes = meals.map(meal => meal.recipe);
  console.log('ingredients', recipes[0].ingredients[0]);

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      if (ingredient.food in result) {
        result[ingredient.food].quantity += ingredient.quantity;
      } else {
        result[ingredient.food] = {
          quantity: ingredient.quantity,
          measure: ingredient.measure,
        };
      }
    });
  });

  console.log('result', result);

  Object.entries(result).forEach(([ingredient, amount]) => {
    list.push({
      ingredient: ingredient,
      quantity: `${amount.quantity} ${amount.measure}`,
      checked: false,
    });
  });
  return list;
};

export default compileList;