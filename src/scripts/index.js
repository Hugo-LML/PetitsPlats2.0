async function getRecipes() {
  let data = await fetch('data/recipes.json');
  let recipes = await data.json().then(data => data.recipes);

  return recipes;
}

async function displaySelect(category, items) {
  const selectsContainer = document.getElementById('selects');

  selectsContainer.appendChild(getSelect(category, items));
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

  displaySelect('ingrédients', recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient)));
  displaySelect('appareils', recipes.flatMap(recipe => recipe.appliance));
  displaySelect('ustensiles', recipes.flatMap(recipe => recipe.ustensils));

  displayRecipes(recipes);
}

main();

function toggleClearButton(buttonId, inputId) {
  const clearButton = document.getElementById(buttonId);
  const searchInput = document.getElementById(inputId);

  if (searchInput.value) {
    clearButton.classList.remove('hidden');
    clearButton.classList.add('flex');
  } else {
    clearButton.classList.add('hidden');
    clearButton.classList.remove('flex');
  }
}

function clearInput(inputId) {
  document.getElementById(inputId).value = '';
}

document.getElementById('search').addEventListener('input', () => toggleClearButton('clear-button', 'search'));
document.getElementById('clear-button').addEventListener('click', () => {
  clearInput('search');
  toggleClearButton('clear-button', 'search');
});