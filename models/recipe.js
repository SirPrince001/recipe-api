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
    },
    category:{
        type:String,
        required:true
    },
    user: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, { timestamps: true });

module.exports = Mongoose.model('Recipe', recipeSchema);