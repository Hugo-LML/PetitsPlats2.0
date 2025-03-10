async function getRecipes() {
  let data = await fetch('data/recipes.json');
  let recipes = await data.json().then(data => data.recipes);

  return recipes;
}

async function displaySelect(category, items, recipes) {
  const selectsContainer = document.getElementById('selects');

  selectsContainer.appendChild(getSelect(category, items, recipes));
}

async function displayRecipes(recipes) {
  const recipesContainer = document.getElementById('recipes');
  recipesContainer.innerHTML = '';

  recipes.forEach(recipe => {
    const recipeCard = getRecipeCard(recipe);
    recipesContainer.appendChild(recipeCard);
  });
}

function filterRecipes(recipes, searchTerm) {
  updateRecipesNumber(recipes.length);

  if (searchTerm.length < 3) searchTerm = '';

  searchTerm = searchTerm.toLowerCase();
  const selectedTags = getSelectedTags();

  const filteredRecipes = recipes.filter(recipe => {
    const nameMatch = recipe.name.toLowerCase().includes(searchTerm);
    const ingredientMatch = recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchTerm));
    const applianceMatch = recipe.appliance.toLowerCase().includes(searchTerm);
    const ustensilMatch = recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(searchTerm));

    const matchesSearch = searchTerm === '' || nameMatch || ingredientMatch || applianceMatch || ustensilMatch;

    const matchesTags =
      selectedTags.ingredients.every(tag => recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === tag)) &&
      selectedTags.appliances.every(tag => recipe.appliance.toLowerCase() === tag) &&
      selectedTags.ustensils.every(tag => recipe.ustensils.some(ustensil => ustensil.toLowerCase() === tag));

    return matchesSearch && matchesTags;
  });

  toggleNoResults(searchTerm, filteredRecipes);
  displayRecipes(filteredRecipes);
  updateRecipesNumber(filteredRecipes.length);
}

function updateRecipesNumber(count) {
  const recipesNumber = document.getElementById('recipes-number');
  recipesNumber.innerHTML = `${count} recette${count > 1 ? 's' : ''}`;
}

function toggleNoResults(searchTerm, filteredRecipes) {
  const noResults = document.getElementById('no-results');
  noResults.innerHTML = `Aucune recette ne contient « ${searchTerm} » vous pouvez chercher « tarte aux pommes », « poisson », etc.`;
  noResults.classList.toggle('hidden', filteredRecipes.length !== 0);
  noResults.classList.toggle('block', filteredRecipes.length === 0);
}

function getSelectedTags() {
  return {
    ingredients: [...document.querySelectorAll('#tags-container-ingrédients div > span')].map(tag => tag.innerHTML),
    appliances: [...document.querySelectorAll('#tags-container-appareils div > span')].map(tag => tag.innerHTML),
    ustensils: [...document.querySelectorAll('#tags-container-ustensiles div > span')].map(tag => tag.innerHTML),
  }
}

function getUniqueItems(recipes) {
  return {
    ingredients: Array.from(new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())))),
    appliances: Array.from(new Set(recipes.flatMap(recipe => recipe.appliance.toLowerCase()))),
    ustensils: Array.from(new Set(recipes.flatMap(recipe => recipe.ustensils).map(ustensil => ustensil.toLowerCase())))
  }
}

async function main() {
  const recipes = await getRecipes();

  updateRecipesNumber(recipes.length);

  displaySelect('ingrédients', getUniqueItems(recipes).ingredients, recipes);
  displaySelect('appareils', getUniqueItems(recipes).appliances, recipes);
  displaySelect('ustensiles', getUniqueItems(recipes).ustensils, recipes);

  displayRecipes(recipes);

  document.getElementById('search').addEventListener('input', (event) => {
    toggleClearButton('clear-button', 'search');
    filterRecipes(recipes, event.target.value);
  });
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

document.getElementById('clear-button').addEventListener('click', async () => {
  clearInput('search');
  toggleClearButton('clear-button', 'search');
  filterRecipes(await getRecipes(), '');
});