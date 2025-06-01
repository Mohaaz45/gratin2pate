function createIngredientCard(product) {
  const col = document.createElement('div');
  col.className = 'col';

  const card = document.createElement('div');
  card.className = 'card ingredient-card h-100';

  const img = document.createElement('img');
  img.src = product.image;
  img.className = 'card-img-top';
  img.alt = product.nom;

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body text-center';

  const title = document.createElement('h5');
  title.className = 'card-title';
  title.textContent = product.nom;

  const nutriImg = document.createElement('img');
  nutriImg.src = product.image_nutriscore;
  nutriImg.alt = `Nutriscore ${product.nutriscore}`;
  nutriImg.style.height = '40px';

  cardBody.appendChild(title);
  cardBody.appendChild(nutriImg);
  card.appendChild(img);
  card.appendChild(cardBody);
  col.appendChild(card);

  return col;
}

function loadIngredients() {
  fetch('ingredients.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const container = document.getElementById('ingredients-container');
      data.forEach(product => {
        const card = createIngredientCard(product);
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Erreur lors du chargement des ingrédients :', error);
    });
}

document.addEventListener('DOMContentLoaded', loadIngredients);
