import RecipeService from "./RecipeService.js";
import RecipeUI from "./RecipeUI.js";

class RecipeApp {
    constructor () {
        this.recipeService = new RecipeService();
        this.recipeUI = new RecipeUI();
    }

    async initialize() {
        await this.recipeService.fetchRecipes();

        document.getElementById('searchButton').addEventListener('click', () => {
            const ingredient = document.getElementById('ingredients').value;
            const results = this.recipeService.searchRecipes(ingredient);
            this.recipeUI.displayResults(results);
        });
    }
}

const app = new RecipeApp();
app.initialize();

function fetchRecipes(callback){
        fetch("recipes.json")
        .then(response => response.json())
        .then(data => {
            console.log("recipe loaded", data);
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
    displayResults(results);
}

// Display recipe result
function displayResults(results) {
    const container = document.getElementById('results');
    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = "<p>No recipes found</p>";
        return;
    }

    results.forEach((recipe) => {
        const card = document.createElement('div');
        card.classList.add('recipe-card');
        card.innerHTML = `
        <div class="recipe-card">
        <img src="${recipe.image}" alt="${recipe.name}" style="width: 100px; height: auto; border-radius: 5px;">
        <h3>${recipe.name}</h3>
        <p>Ingredients: ${recipe.ingredients.join(", ")}</p>
        <p><strong class="view-details" data-id="${recipe.id}" style="text-decoration: underline; cursor: pointer;">Click to view details</strong></p>
        <p class="recipe-instructions" id="instructions-${recipe.id}" style="display: none;"><strong>Instructions:</strong> ${recipe.instructions}</p>
        </div>
        `;
        container.appendChild(card);
    });

    document.querySelectorAll(".view-details").forEach(button => {
        button.addEventListener("click", function() {
            const recipeId = this.getAttribute("data-id");
            const instructions = document.getElementById(`instructions-${recipeId}`);
            instructions.style.display = instructions.style.display === "none" ? "block" : "none";
        });
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
