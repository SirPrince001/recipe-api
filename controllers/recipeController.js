require('dotenv').config();
const Mongoose = require('mongoose');
const Recipe = require('../models/recipe');


// create new recipe
exports.createRecipe = async (request, response, next) => {
    try {
        let { recipe_title, description, ingredients, instructions } = request.body;

        let newRecipe =  new Recipe({
            recipe_title,
            description,
            ingredients,
            instructions
        })
    
        let savedRecipe = await newRecipe.save();
        return response.status(201).json({
            success:true ,
            responseMessage: 'New Recipe created Successfully..',
            data: savedRecipe
        })
    
    } catch (error) {
        next(error)
    }
   }


   // update recipe
   exports.updateRecipe = async (request, response, next) => {
    try {
        // user inputs
        let { recipe_title, description, ingredients, instructions } = request.body;

        let recipe_Id = request.params.id;
        // check if recipe id is valid
        if(!Mongoose.isValidObjectId(recipe_Id)){
            throw new NotFoundError(`Recipe with id ${recipe_Id} not found`);
        }
            // validate user input
            if (!recipe_title ||!description ||!ingredients ||!instructions) {
                throw new ValidationError('All fields are required');
            }

        // update recipe
        let updatedRecipe = await Recipe.findByIdAndUpdate(recipe_Id, {
            recipe_title,
            description,
            ingredients,
            instructions
        }, { new: true });
        return response.status(200).json({
            success:true ,
            responseMessage: 'Recipe updated Successfully..',
            data: updatedRecipe
        })
    
    } catch (error) {
        next(error)
    }
   }


   // delete recipe
   exports.deleteRecipe = async (request, response, next) => {
    try {
        let recipe_Id = request.params.id;

        // check if recipe id is valid
        if(!Mongoose.isValidObjectId(recipe_Id)){
            throw new NotFoundError(`Recipe with id ${recipe_Id} not found`);
        }

        let deletedRecipe = await Recipe.findByIdAndDelete(recipe_Id);
        return response.status(200).json({
            success:true ,
            responseMessage: 'Recipe deleted Successfully..',
            data: deletedRecipe
        })
    
    } catch (error) {
        next(error)
    }
   }


   // get all recipes
   exports.getAllRecipes = async (request, response, next) => {
    try {
        let recipes = await Recipe.find({}).populate("user" , "fullName");
        return response.status(200).json({
            success:true ,
            responseMessage: 'All Recipes..',
            data: recipes
        })
    
    } catch (error) {
        next(error)
    }
   }


   // get single recipe
   exports.getSingleRecipe = async(request , response , next)=>{
    try {
        let recipe_Id = request.params.id;

        //check if the id is valid
        if(!Mongoose.isValidObjectId(recipe_Id)){
            throw new NotFoundError(`Recipe with id ${recipe_Id} not found`);
        }
        let singleRecipe = await Recipe.findById(recipe_Id).populate("user" , "fullName");
        return response.status(200).json({
            success:true ,
            responseMessage: 'Single Recipe fetched Successfully..',
            data: singleRecipe
        })
    } catch (error) {
        next()
    }
   
   }

   // search recipe by category using regex
   exports.searchRecipeByCategory = async (request, response, next) => {
    try {
        let category = request.params.category;
        let regex = new RegExp(category, 'i');
        let recipes = await Recipe.find({ category: regex }).populate("user" , "fullName");
        return response.status(200).json({
            success:true ,
            responseMessage: 'All Recipes..',
            data: recipes
        })
    
    } catch (error) {
        next(error)
    }
   }

  






