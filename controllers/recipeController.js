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