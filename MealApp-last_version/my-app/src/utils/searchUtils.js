export const searchRecipes = (query, allRecipes, setRecipes) => {
    const lowerCaseQuery = query.toLowerCase();
    const filteredRecipes = allRecipes.filter(recipe =>
        recipe.strMeal.toLowerCase().includes(lowerCaseQuery) ||
        (recipe.strIngredients && recipe.strIngredients.toLowerCase().includes(lowerCaseQuery))
    );
    setRecipes(filteredRecipes.length ? filteredRecipes : []);
};

export const getRecipesByCategory = (category, allRecipes, setRecipes) => {
    const filteredRecipes = allRecipes.filter(recipe => recipe.strCategory === category);
    setRecipes(filteredRecipes.length ? filteredRecipes : []);
};