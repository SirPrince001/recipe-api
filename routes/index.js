const router = require('express').Router();
router.use(require('./userRoutes'));
router.use(require('./recipe'));

module.exports = router;