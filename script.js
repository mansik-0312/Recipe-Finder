// Fetch recipes from local JSON file and log data to console
// document.addEventListener("DOMContentLoaded", function () {
//     const searchButton = document.getElementById("searchButton");
//     const ingredientsInput = document.getElementById("ingredients");
//     const resultsContainer = document.getElementById("results");
// function fetchRecipes(callback) {
function fetchRecipes(callback){
        fetch("recipes.json")
        .then(response => response.json())
        .then(data => {
            console.log("recipe loded", data);
            callback(data);
        })
        .catch(error => console.error("Error loading recipes:", error));
}

// Search recipes by ingredient
function searchRecipes (recipes) {
    const input = document.getElementById('ingredients').value.toLowerCase();
    const results = recipes.filter((recipes) => 
    recipes.ingredients.some(ingredients => ingredients.toLowerCase().includes(input))
    );
    displayRecipes(results);
}

// Display recipe result
function displayResult(results) {
    const container = document.getElementById('results');
    container.innerHTML = '';

    if (recipes.length === 0) {
        container.innerHTML = "<p>No recipes found</p>";
        return;
    }

    results.forEach((recipes) => {
        const card = document.getElementById('div');
        card.classList.add('recipe-card');
        card.innerHTML = `
        <div class="recipe-card" onclick="viewRecipeDetails(${recipes.id})">
        <img src="${recipes.image}" alt="${recipes.name}">
        <h3>${recipes.name}</h3>
        <p><strong>Click to view the details</p>
        </div>
        `;
        container.appendChild(card);
    });
}

// View detailed recipe instructions
function viewRecipeDetails(recipeId) {
    fetch("recipe.json")
    .then(response => response.json())
    .then(recipes => {
        const recipe = recipes.find(r => r.id === recipeId);
        if (recipe) {
            const detailContainer = document.getElementById("recipeDetail");
            detailContainer.innerHTML = `
            <div class="recipe-detail">
                <h2>${recipe.name}</h2>
                <img src="${recipe.image}" alt="${recipe.name}">
                <p><strong>Ingredient:</strong> ${recipe.ingredients.join(",")}</p>
                <p><strong>Instruction:</strong>${recipe.instructions}</p>
                <button onclick="closeRecipeDetails()">Close</button>
            </div>
            `;
            detailContainer.style.display = 'block';
        }
    });
}

function closeRecipeDetails() {
    document.getElementById('recipeDetail').style.display = 'none';
}

function initialize() {
    fetchRecipes(function (recipes) {
        document.getElementById('searchButton').addEventListener('click', function() {
            searchRecipes(recipes);
        });
    }); 
}
document.addEventListener("DOMContentLoaded", initialize);



//     function displayRecipes(recipes) {
//         resultsContainer.innerHTML = "";
//         if (recipes.length === 0) {
//             resultsContainer.innerHTML = "<p>No recipes found</p>";
//             return;
//         }
//         recipes.forEach((recipe) => {
//             const recipeCard = document.createElement('div');
//             recipeCard.classList.add('recipe-card');
//             recipeCard.innerHTML = `
//             <h3>${recipe.name}</h3>
//             <p><strong>Difficult:</strong> ${recipe.difficulty}</p>
//             <p><strong>Time:</strong> ${recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</p>
//             <p><strong>Ingredients:</strong>${recipe.ingredients.join(",")}</p>
//             <p><strong>Instructions:</strong> ${recipe.instructions.join("<br>")}</p>
//             `;
//             resultsContainer.appendChild(recipeCard);
//         });
//     }
// });