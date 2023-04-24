const inputSearch = document.querySelector('.search');
const submit = document.querySelector('.btnsearch');
const random = document.querySelector('.btnshuffle');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const single_mealEl = document.getElementById('single-meal');

function randomMeal(e) {
    e.preventDefault();
    single_mealEl.innerHTML = ''
    mealsEl.innerHTML = '';
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const meal = data.meals[0];
      console.log(meal);
      showMealUi(meal);
    });
}
function showMealUi(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      console.log(meal[`strMeasure${i}`] + ' of ' + meal[`strIngredient${i}`]);
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }
  console.log(ingredients);
  single_mealEl.innerHTML = `
<div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img class ="chosenmeal"src="${meal.strMealThumb}" alt="meal.strMeal">
    <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        <p>${meal.strArea}</p>
    </div>

    <div class="main">
    <p>${meal.strInstructions}</p>
    <h2>Ingredients</h2>
    <ul>
      ${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
    </ul>
  </div>

</div>`;
}
function getMealById(IdMeal) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${IdMeal}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const meal = data.meals[0];
      console.log(meal);
      showMealUi(meal);
    });
}
function searchMeals(e) {
  e.preventDefault();
  single_mealEl.innerHTML = '';
  if (inputSearch.value.trim() === '') {
    alert('please insert a meal name');
  } else {
    console.log(inputSearch.value);
    fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>search results for '${inputSearch.value}'</h2>`;
        if (data.meals === null) {
          resultHeading.innerHTML = `<p>no results found for '${inputSearch.value}'</p>`;
        } else {
          // mealsEl.innerHTML = ` <div class="meal">
          // <img src="${data.meals[0].strMealThumb}" alt="meal.strMeal"></div>`;
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
          <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="meal-info" data-mealid="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>
            </div>
          </div>
        ` // make it string not array
            )
            .join('');
        }
      });
  }
}
//evnet listeners
submit.addEventListener('click', searchMeals);
mealsEl.addEventListener('click', (e) => {
  const mealInfo = e.target.closest('div');
  console.log(mealInfo);
  if (mealInfo) {
    const Id = mealInfo.getAttribute('data-mealid');
    // const Id = mealInfo.dataset.mealid;
    console.log(Id);
    getMealById(Id);
  }
});
random.addEventListener('click', randomMeal);

