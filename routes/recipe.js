const router = require('express').Router();
const recipeRoutes = require('../controllers/recipeController')
const userAuth = require('../middlewares/authUser');

router.post('/api/v1/create-recipe', userAuth, recipeRoutes.createRecipe);
module.exports = router;