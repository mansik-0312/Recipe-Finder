// Fetch recipes from local JSON file and log data to console
document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("searchButton");
    const ingredientsInput = document.getElementById("ingredients");
    const resultsContainer = document.getElementById("results");

    fetch("recipes.json")
        .then(response => response.json())
        .then(data => {
            console.log("recipe loded", data);
            window.recipes = data;
        })
        .catch(error => console.error("Error loading recipes:", error));

    function searchRecipes (recipes) {
        const input = document.getElementById('ingredients').value.toLowerCase();
        const results = recipes.filter((recipes) => 
        recipes.ingredients.some(ingredients => ingredients.toLowerCase().includes(input))
        );
        displayRecipes(results);
    }

    function displayRecipes(recipes) {
        resultsContainer.innerHTML = "";
        if (recipes.length === 0) {
            resultsContainer.innerHTML = "<p>No recipes found</p>";
            return;
        }
        recipes.forEach((recipe) => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            recipeCard.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>Difficult:</strong> ${recipe.difficulty}</p>
            <p><strong>Time:</strong> ${recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</p>
            <p><strong>Ingredients:</strong>${recipe.ingredients.join(",")}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions.join("<br>")}</p>
            `;
            resultsContainer.appendChild(recipeCard);
        });
    }
});