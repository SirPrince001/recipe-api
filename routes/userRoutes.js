const router = require('express').Router();
const userRoutes = require('../controllers/userController');

router.post('/api/v1/register', userRoutes.registerUser);
router.post('/api/v1/login' , userRoutes.loginUser);
router.get('/api/v1/get-all-users' , userRoutes.getAllUsers);


module.exports = router;