import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RecipeList from './components/RecipeList/RecipeList';
import Navbar from './components/navbar/Navbar';
import Loader from './components/Loader/Loader';

import { useRecipes } from './hooks/useRecipes';
import { useFavorites } from './hooks/useFavorites';

import { searchRecipes, getRecipesByCategory } from './utils/searchUtils';
import { getRandomRecipes } from './utils/recipeUtils'; 

import './App.css';

function App() {
    const { recipes, allRecipes, categories, loading, error, setRecipes } = useRecipes();
    const { favoriteRecipes, addToFavorites, removeFromFavorites } = useFavorites();

    const handleSearchRecipes = (query = '') => {
        searchRecipes(query, allRecipes, setRecipes);
    };

    const handleGetRecipesByCategory = (category) => {
        getRecipesByCategory(category, allRecipes, setRecipes);
    };

    const handleMealAppClick = () => {
        const randomRecipes = getRandomRecipes(allRecipes, recipes.length);  
        setRecipes(randomRecipes);
    };

    return (
        <Router>
            <div className="App">
                <Navbar categories={categories} onCategorySelect={handleGetRecipesByCategory} onSearch={handleSearchRecipes} onMealAppClick={handleMealAppClick} />
                <div className="container">
                    {loading && <Loader />}
                    {error && !loading && !categories.length && <div className="alert alert-danger">{error}</div>}
                    <Routes>
                        <Route
                            path="/"
                            element={<RecipeList recipes={recipes} favoriteRecipes={favoriteRecipes} onAddToFavorites={addToFavorites} onRemoveFromFavorites={removeFromFavorites} />}
                        />
                        <Route
                            path="/favorites"
                            element={<RecipeList recipes={favoriteRecipes} favoriteRecipes={favoriteRecipes} onRemoveFromFavorites={removeFromFavorites} />}
                        />
                        {categories.map(category => (
                            <Route
                                key={category}
                                path={`/${category}`}
                                element={<RecipeList recipes={recipes} favoriteRecipes={favoriteRecipes} onAddToFavorites={addToFavorites} onRemoveFromFavorites={removeFromFavorites} />}
                            />
                        ))}
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
