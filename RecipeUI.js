export default class RecipeUI {
    constructor() {
        this.container = document.getElementById('results');
    }

    displayResults(recipes) {
        this.container.innerHTML = '';
        document.querySelector('')

        if (recipes.length === 0) {
            this.container.innerHTML = "<p>No recipes found</p>";
            return;
        }

        recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.classList.add('recipe-card');
            card.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
                <h3>${recipe.name}</h3>
                <p>Ingredients: ${recipe.ingredients.join(", ")}</p>
                <p><strong class="view-details" data-id="${recipe.id}">Click to view details</strong></p>
                <p class="recipe-instructions" id="instructions-${recipe.id}" style="display: none;">
                    <strong>Instructions:</strong> ${recipe.instructions}
                </p>
            `;
            this.container.appendChild(card);
        });

        this.attachDetailListeners();
    }

    attachDetailListeners() {
        document.querySelectorAll(".view-details").forEach(button => {
            button.addEventListener("click", function() {
                const recipeId = this.getAttribute("data-id");
                const instructions = document.getElementById(`instructions-${recipeId}`);
                instructions.style.display = instructions.style.display === "none" ? "block" : "none";
            });
        });
    }
}