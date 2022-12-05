
import * as model from './model.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import {Fraction} from 'fractional';
import { async } from 'regenerator-runtime';
console.log(Fraction);


///////////////////////////////////////

const controlRecipes = async function(){
  try{

    const id = window.location.hash.slice(1);
    console.log(id);

    if(!id) return ;
    recipeView.renderSpinner();
    //Loading Racipe
  
    await model.loadRecipe(id);
   // const {recipe} = model.state ;

    //Rendaring recipe
    recipeView.render(model.state.recipe);       
  }
  catch(err){
    recipeView.renderError();
  }
};

const controlSearchResults = async function(){
  try{
    const query = searchView.getQuery();
    if (!query) return;
    await model.LoadSearchResults(query);
    console.log(model.state.search.results);
  }catch(err){
    console.log(err);
  }
};
controlSearchResults();

const init = function(){
  recipeView.addHandlerRender(controlRecipes);
} 
init();

