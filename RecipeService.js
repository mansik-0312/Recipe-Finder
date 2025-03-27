export default class RecipeService {
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
}