import RecipeServices from "./RecipeServices.js";
import RecipeUI from "./RecipeUI.js";

class RecipeApp {
    constructor() {
        this.recipeService = new RecipeServices();
        this.recipeUI = new RecipeUI();
    }

    async initialize() {
        await this.recipeService.fetchRecipes();

        // Display all recipes initially
        this.recipeUI.displayResults(this.recipeService.recipes);

        document.getElementById('searchButton').addEventListener('click', () => {
            const ingredient = document.getElementById('ingredients').value;

            if (ingredient === "") {
                // Show all recipes if no ingredient is entered
                this.recipeUI.displayResults(this.recipeService.recipes);
                return;
            }
            
            const results = this.recipeService.searchRecipes(ingredient);
            this.recipeUI.displayResults(results);
        });
    }
}

const app = new RecipeApp();
app.initialize();