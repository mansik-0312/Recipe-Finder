export default class RecipeServices {
    constructor () {
        this.recipes = [];
    }

    async fetchRecipes() {
        try{
            const response = await fetch("recipes.json");
            this.recipes = await response.json();
            console.log("Recipes loaded", this.recipes);
        } catch (error) {
            console.log("Error loading recipes: ", error);
        }
    }

    searchRecipes (ingredient) {
        return this.recipes.filter(recipe =>
            recipe.ingredients.some(ing => ing.toLowerCase().includes(ingredient.toLowerCase()))
        );

    }
}