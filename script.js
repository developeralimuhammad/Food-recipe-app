const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.search-result');
const searchBtn = document.querySelector('#search-btn')
const container = document.querySelector('.container');
const searchInput = document.querySelector("#search-input"
)
let searchQuery = '';
const APP_ID = 'ba651c53';
const App_key = 'e0d8e395cad69f4e02811fc8ea46d340';

console.log("FORM")
console.log("FORM ", searchForm)


searchBtn.addEventListener('click', (e) => {
  console.log("HELLLOWWW")
  searchQuery = searchInput.value
  console.log(searchQuery)
  fetchAPI(searchQuery)
});

searchForm.addEventListener('submit', (e) => {
  console.log("HELLLOWWW")
  e.preventDefault()
  searchQuery = e.target.querySelector('input').value
  console.log(searchQuery)
  fetchAPI(searchQuery)
});

async function fetchAPI(query) {
  console.log("hello")
  const baseURl = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${App_key}`;
  const response = await fetch(baseURl);
  const data = await response.json();
  console.log("data ", data)
  generateHTML(data.hits);
  // console.log(data);
  // console.log(baseURl)


}


function generateHTML(results) {
  container.classList.remove("initial");
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `
        <div class="item">
          <img src="${result.recipe.image}" alt="img">
          <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class="view-btn" target="_blank" href="${result.recipe.url
      }">View Recipe</a>
          </div>
          <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
          <p class="item-data">Diet label: ${result.recipe.dietLabels.length > 0
        ? result.recipe.dietLabels
        : "No Data Found"
      }</p>
          <p class="item-data">Health labels: ${result.recipe.healthLabels}</p>
        </div>
      `;
  });
  searchResultDiv.innerHTML = generatedHTML;
}