const router = require('express').Router();
const userAuth = require('../middlewares/authUser');
const recipeRoutes = require('../controllers/recipeController');

router.post('/api/v1/create-recipe', userAuth , recipeRoutes.createRecipe);



module.exports = router;