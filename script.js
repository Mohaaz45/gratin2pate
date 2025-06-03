function createIngredientCard(product) {
  const col = document.createElement('div');
  col.className = 'col';

  const card = document.createElement('div');
  card.className = 'card ingredient-card h-100';

  const img = document.createElement('img');
  img.src = product.image || 'https://via.placeholder.com/150?text=Image+manquante';
  img.className = 'card-img-top';
  img.alt = product.nom;

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body text-center';

  const title = document.createElement('h5');
  title.className = 'card-title';
  title.textContent = product.nom;

  const nutriImg = document.createElement('img');
  const validGrades = ['a', 'b', 'c', 'd', 'e'];
  const grade = product.nutriscore?.toLowerCase();
  
  if (validGrades.includes(grade)) {
    nutriImg.src = `https://static.openfoodfacts.org/images/attributes/dist/nutriscore-${grade}.svg`;
    nutriImg.alt = `Nutriscore ${grade}`;
  } else {
    nutriImg.src = 'https://static.openfoodfacts.org/images/attributes/dist/nutriscore-not-applicable-new-fr.svg';
    nutriImg.alt = 'Nutriscore non applicable';
  }
  nutriImg.style.height = '40px';

  cardBody.appendChild(title);
  cardBody.appendChild(nutriImg);
  card.appendChild(img);
  card.appendChild(cardBody);
  col.appendChild(card);

  return { col, grade };
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
      container.innerHTML = ''; // On vide le container s'il y avait déjà des éléments

      const nutriMap = { a: 1, b: 2, c: 3, d: 4, e: 5 };
      let totalScore = 0;
      let count = 0;

      data.forEach(product => {
        const { col, grade } = createIngredientCard(product);
        container.appendChild(col);

        if (nutriMap[grade]) {
          totalScore += nutriMap[grade];
          count++;
        }
      });

      // Calcul et affichage du Nutri-score global
      const globalNutri = document.getElementById('global-nutriscore');
      if (count > 0) {
        const avgScore = totalScore / count;
        let finalGrade = '';

        if (avgScore < 1.5) finalGrade = 'a';
        else if (avgScore < 2.5) finalGrade = 'b';
        else if (avgScore < 3.5) finalGrade = 'c';
        else if (avgScore < 4.5) finalGrade = 'd';
        else finalGrade = 'e';

        globalNutri.innerHTML = '<h3>Nutriscore moyen :</h3>';
        const scoreImg = document.createElement('img');
        scoreImg.src = `https://static.openfoodfacts.org/images/attributes/dist/nutriscore-${finalGrade}.svg`;
        scoreImg.alt = `Nutriscore global: ${finalGrade}`;
        scoreImg.style.height = '40px';

        const avgText = document.createElement('p');
        avgText.textContent = `Score moyen : ${avgScore.toFixed(2)} (${finalGrade.toUpperCase()})`;

        globalNutri.appendChild(scoreImg);
        globalNutri.appendChild(avgText);
      } else {
        globalNutri.innerHTML = '<p>Aucun Nutriscore valide pour calculer un score moyen.</p>';
      }
    })
    .catch(error => {
      console.error('Erreur lors du chargement des ingrédients :', error);
    });
}

document.addEventListener('DOMContentLoaded', loadIngredients);