const button = document.getElementById("getMeal");
const display = document.getElementById("recipeDisplay");

button.addEventListener("click", fetchRandomMeal);

async function fetchRandomMeal() {
  try {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = await res.json();
    const meal = data.meals[0];
    showMeal(meal);
  } catch (error) {
    display.innerHTML = `<p>Failed to fetch recipe. Try again later.</p>`;
  }
}

function showMeal(meal) {
  // Gather ingredients & measures
  let ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  display.innerHTML = `
    <h2>${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <div class="ingredients">
      <h3>Ingredients:</h3>
      <ul>
        ${ingredients.map(item => `<li>${item}</li>`).join("")}
      </ul>
    </div>
    <h3>Instructions:</h3>
    <ol>
      ${meal.strInstructions
        .split(/\r?\n/)
        .filter(step => step.trim() !== "")
        .map(step => `<li>${step}</li>`)
        .join("")}
    </ol>
  `;
}
