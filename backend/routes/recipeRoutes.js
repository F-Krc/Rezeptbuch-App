import { Router } from 'express';

import { getRecipes, getRecipe, addRecipe, updateRecipe, deleteRecipe } from '../controller/recipesController.js';

const recipeRouter = Router();

recipeRouter
  .get('/recipes', getRecipes) // Get All Recipes
  .get('/recipes/:name', getRecipe) // Find Recipe
  .post('/recipes', addRecipe) // Add Recipes
  .put('/recipes/:id', updateRecipe) // Update Recipe
  .delete('/recipes/:id', deleteRecipe); // Delete Recipe

export default recipeRouter;
