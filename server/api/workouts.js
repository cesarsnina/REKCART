const router = require('express').Router();
const { Workout } = require('../model');

router.get('/', async(req,res) => {
    let workouts = await Workout.findAll();
    res.json(workouts);
});

module.exports = router;
