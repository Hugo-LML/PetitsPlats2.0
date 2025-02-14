function getSelect(category, items, recipes) {
  // Container creation
  const container = document.createElement('div');

  // Select creation
  const select = document.createElement('div');
  select.className = 'w-48 overflow-hidden rounded-xl bg-white';

  // Button creation
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'flex w-full items-center justify-between p-4';
  
  const span = document.createElement('span');
  span.className = 'font-medium capitalize';
  span.textContent = category;
  
  const img = document.createElement('img');
  img.src = '../public/assets/icons/arrow-down.svg';
  img.alt = 'arrow down icon';
  img.className = 'transition-transform';

  button.appendChild(span);
  button.appendChild(img);

  // Search input creation
  const searchContainer = document.createElement('label');
  searchContainer.className = 'relative mt-[0.875rem] block px-4 hidden';
  searchContainer.htmlFor = `search-${category}`;

  const input = document.createElement('input');
  input.type = 'text';
  input.id = `search-${category}`;
  input.name = `search-${category}`;
  input.className = 'h-9 w-full rounded-sm border border-gray bg-white py-2.5 pl-2.5 pr-11 text-sm text-gray focus:outline-none focus:ring-1 focus:ring-gray';

  const searchButton = document.createElement('button');
  searchButton.type = 'button';
  searchButton.className = 'absolute right-[1.625rem] top-1/2 flex h-9 w-4 -translate-y-1/2 items-center justify-center';
  
  const searchIcon = document.createElement('img');
  searchIcon.src = '../public/assets/icons/search-gray.svg';
  searchIcon.alt = 'search icon';
  searchIcon.className = 'size-[0.875rem] object-cover';

  searchButton.appendChild(searchIcon);

  const clearButton = document.createElement('button');
  clearButton.type = 'button';
  clearButton.id = `clear-${category}`;
  clearButton.className = 'absolute right-11 top-1/2 h-9 w-4 -translate-y-1/2 items-center justify-center hidden';
  
  const clearIcon = document.createElement('img');
  clearIcon.src = '../public/assets/icons/clear.svg';
  clearIcon.alt = 'clear icon';
  clearIcon.className = 'size-2 object-cover';

  clearButton.appendChild(clearIcon);

  searchContainer.appendChild(input);
  searchContainer.appendChild(searchButton);
  searchContainer.appendChild(clearButton);

  // List items creation
  const list = document.createElement('ul');
  list.className = 'mt-4 max-h-40 overflow-y-auto text-sm hidden';

  // Tags container creation
  const tagsContainer = document.createElement('div');
  tagsContainer.id = `tags-container-${category}`;
  tagsContainer.className = 'mt-5 w-full space-y-2';

  // Update results list
  function updateList() {
    list.innerHTML = '';
    const searchTerm = input.value.toLowerCase();
    const selectedTags = [...tagsContainer.querySelectorAll('div > span')].map(tag => tag.innerHTML.toLowerCase());

    const filteredRecipes = Array.from(document.querySelectorAll('#recipes article h2')).map(recipeName => recipeName.innerHTML.toLowerCase());

    const filteredItems = items.filter(item =>
      item.includes(searchTerm) &&
      !selectedTags.includes(item) &&
      filteredRecipes.some(recipeName => {
        const recipe = recipes.find(r => r.name.toLowerCase() === recipeName);
        if (!recipe) return false;

        if (category === 'ingrédients') {
          return recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === item);
        } else if (category === 'appareils') {
          return recipe.appliance.toLowerCase() === item;
        } else if (category === 'ustensiles') {
          return recipe.ustensils.some(ustensil => ustensil.toLowerCase() === item);
        }
        return false;
      })
    );

    filteredItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'cursor-pointer px-4 py-2.5 truncate capitalize hover:bg-yellow';
        listItem.textContent = item;
        
        listItem.addEventListener('click', () => {
          input.value = item;
          toggleClearButton(`clear-${category}`, `search-${category}`);
          addTag(item, tagsContainer);
          updateList();
        });
        
        list.appendChild(listItem);
      });
  }

  // Add tag to tags container
  async function addTag(item, container) {
    // Tag element creation
    const tag = document.createElement('div');
    tag.className = 'flex w-full items-center justify-between rounded-[0.625rem] bg-yellow pl-4';
  
    const tagText = document.createElement('span');
    tagText.className = 'truncate text-sm capitalize';
    tagText.textContent = item;
  
    const clearButton = document.createElement('button');
    clearButton.type = 'button';
    clearButton.className = 'flex size-12 items-center justify-center';
  
    const clearIcon = document.createElement('img');
    clearIcon.src = '../public/assets/icons/clear-black.svg';
    clearIcon.alt = 'clear icon';
  
    clearButton.appendChild(clearIcon);
    clearButton.addEventListener('click', async () => {
      tag.remove();
      updateList();
      filterRecipes(await getRecipes(), document.getElementById('search').value);
    });
  
    tag.appendChild(tagText);
    tag.appendChild(clearButton);
    container.appendChild(tag);

    filterRecipes(await getRecipes(), document.getElementById('search').value);
  }

  // Toggle select state
  button.addEventListener('click', () => {
    const isOpen = searchContainer.classList.contains('hidden');
    searchContainer.classList.toggle('hidden', !isOpen);
    list.classList.toggle('hidden', !isOpen);
    img.classList.toggle('rotate-180', isOpen);
    updateList();
  });

  // Update list when typing
  input.addEventListener('input', () => {
    toggleClearButton(`clear-${category}`, `search-${category}`);
    updateList();
  });

  // Clear input
  clearButton.addEventListener('click', () => {
    clearInput(`search-${category}`);
    toggleClearButton(`clear-${category}`, `search-${category}`);
    updateList();
  });

  // Add elements to select
  select.appendChild(button);
  select.appendChild(searchContainer);
  select.appendChild(list);

  // Add elements to container
  container.appendChild(select);
  container.appendChild(tagsContainer);

  return container;
}

