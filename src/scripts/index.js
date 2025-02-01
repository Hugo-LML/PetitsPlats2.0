async function getRecipes() {
  let data = await fetch('data/recipes.json');
  let recipes = await data.json().then(data => data.recipes);

  return recipes;
}

async function displayRecipes(recipes) {
  const recipesContainer = document.getElementById('recipes');

  recipes.forEach(recipe => {
    const recipeCard = getRecipeCard(recipe);
    recipesContainer.appendChild(recipeCard);
  });
}

async function main() {
  const recipes = await getRecipes();
  displayRecipes(recipes);
}

main();
