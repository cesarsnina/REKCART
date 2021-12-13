const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/workouts', require('./workouts'));

module.exports = router;
