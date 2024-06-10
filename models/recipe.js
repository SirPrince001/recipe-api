const Mongoose = require('mongoose');

let recipeSchema = new Mongoose.Schema({
    recipe_title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    instructions: {
        type: [String],
        required: true
    }
}, { timestamps: true });

module.exports = Mongoose.model('Recipe', recipeSchema);