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

    searchButton.addEventListener("click", function () {
        const query = ingredientsInput.value.toLowerCase();
        const filteredRecipes = window.recipes.filter(recipe =>
            recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query))
        );
        displayRecipes(filteredRecipes);
    })
});