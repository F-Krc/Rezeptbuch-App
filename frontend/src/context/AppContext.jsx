import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  const backendUrl = 'https://recipebook-api-1pfd.onrender.com';

  // Rezepte abrufen
  useEffect(() => {
    fetchRecipes();
  }, [recipes]);


  // Rezepte abrufen
  const fetchRecipes = async () => {
    try {
      const response = await axios.get(`${backendUrl}/recipes`);
      setRecipes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Rezept erstellen
  const createRecipe = async (recipeData) => {
    try {
      const response = await axios.post(`${backendUrl}/recipes`, recipeData);
      setRecipes((prevRecipes) => [...prevRecipes, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  // Rezept löschen
  const deleteRecipe = async (recipeId) => {
    try {
      await axios.delete(`${backendUrl}/recipes/${recipeId}`);
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== recipeId));
    } catch (error) {
      console.log(error);
    }
  };

  // Rezept Update
  const updateRecipe = async (recipeData) => {
    try {
      await axios.put(`${backendUrl}/recipes/${selectedRecipe._id}`, recipeData);
      setRecipes((prevRecipes) => {
        return prevRecipes.map((recipe) => {
          if (recipe._id === selectedRecipe._id) {
            return { ...recipe, ...recipeData };
          }
          return recipe;
        });
      });
      setSelectedRecipe(null);
    } catch (error) {
      console.log(error);
    }
  };

  // Rezept suchen
  const searchRecipes = async (searchTerm) => {
    try {
      if (searchTerm.trim() === '') {
        fetchRecipes();
        setFilteredRecipes([]);
      } else {
        const response = await axios.get(`${backendUrl}/recipes/${searchTerm}`);
        //console.log(response.data);
        setFilteredRecipes(response.data);
        //console.log(filteredRecipes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRezeptlistClick = () => {
    setFilteredRecipes([]);
    fetchRecipes();
  };

  return (
    <AppContext.Provider
      value={{
        filteredRecipes,
        recipes,
        selectedRecipe,
        setSelectedRecipe,
        backendUrl,
        createRecipe,
        deleteRecipe,
        updateRecipe,
        searchRecipes,
        handleRezeptlistClick,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

