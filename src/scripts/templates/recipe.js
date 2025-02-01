function getRecipeCard(recipe) {
  const article = document.createElement('article');
  article.className = 'overflow-hidden rounded-[1.25rem] bg-white shadow-[0px_4px_34px_30px_rgba(0,0,0,0.04)]';

  const imageContainer = document.createElement('div');
  imageContainer.className = 'relative h-64 w-full';

  const img = document.createElement('img');
  img.src = `../public/assets/images/${recipe.image}`;
  img.alt = recipe.name;
  img.className = 'h-full w-full object-cover';

  const timeBadge = document.createElement('p');
  timeBadge.className = 'bg-yellow absolute right-5 top-5 rounded-full px-3.5 py-1 text-xs';
  timeBadge.textContent = `${recipe.time}min`;

  imageContainer.appendChild(img);
  imageContainer.appendChild(timeBadge);

  const content = document.createElement('div');
  content.className = 'px-6 pb-16 pt-7';

  const title = document.createElement('h2');
  title.className = 'font-anton text-lg';
  title.textContent = recipe.name;

  const recipeHeading = document.createElement('h3');
  recipeHeading.className = 'text-gray mt-7 text-xs font-bold uppercase tracking-wide';
  recipeHeading.textContent = 'Recette';

  const description = document.createElement('p');
  description.className = 'mt-5 text-sm line-clamp-4';
  description.textContent = recipe.description;

  const ingredientsHeading = document.createElement('h3');
  ingredientsHeading.className = 'text-gray mt-7 text-xs font-bold uppercase tracking-wide';
  ingredientsHeading.textContent = 'Ingrédients';

  const ingredientsList = document.createElement('div');
  ingredientsList.className = 'mt-5 grid grid-cols-2 gap-y-5 text-sm';

  recipe.ingredients.forEach(ingredient => {
    const ingredientItem = document.createElement('p');
    ingredientItem.className = 'flex flex-col';

    const ingredientName = document.createElement('span');
    ingredientName.textContent = ingredient.ingredient;

    const ingredientQuantity = document.createElement('span');
    ingredientQuantity.className = 'text-gray';
    ingredientQuantity.textContent = ingredient.quantity ? `${ingredient.quantity} ${ingredient.unit || ''}` : '';

    ingredientItem.appendChild(ingredientName);
    ingredientItem.appendChild(ingredientQuantity);
    ingredientsList.appendChild(ingredientItem);
  });

  content.appendChild(title);
  content.appendChild(recipeHeading);
  content.appendChild(description);
  content.appendChild(ingredientsHeading);
  content.appendChild(ingredientsList);

  article.appendChild(imageContainer);
  article.appendChild(content);

  return article;
}