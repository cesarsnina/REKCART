const router = require('express').Router();
const { User } = require('../model');

// GET - retrieve one user
router.get('/:id', async(req,res) => {
    const id = req.params.id;
    let user = await User.findByPk(id);
    
    const userWorkouts = await user.getWorkouts()
    const data = {user: user, workouts: userWorkouts}

    res.json(data); 
});

// MAKE SURE TO IMPLEMENT REDIRECT FEATURE FOR BOTH POST AND PUT (SEE PUT)
// POST - create user
router.post('/', async(req, res, next) => {
    try {
        const user = await User.create(req.body)
        res.send(user, "You have successfully created your account :).")
    } catch (error) {
        console.log("error from post/users.js:", error)
        next(error)
    }
})

// PUT - update user
router.put('/:id', async(req, res, next) => {
    try {
        const updatedUser = req.body;
        const id = req.params.id;

        const user = await User.update(updatedUser, {
            where: {
                id: id
            }
        })
        res.send(user, "Your account has been successfully updated")
    } catch(error) {
        console.log("error from put/users.js:", error)
        next(error)
    }
})

// POST - create workout
router.post('/:id/workout', async(req, res, next) => {
    try {
        const id = req.params.id;
        let user = await User.findByPk(id);

        const workout = await Workout.create(req.body)
        await user.addWorkout(workout)

        res.send(workout, "You have successfully created your account :).")
    } catch (error) {
        console.log("error from post/workouts.js:", error)
        next(error)
    }
})

// PUT - update workout
router.put(':id/workout/:wid', async(req, res, next) => { // :wid - workout id
    try {
        const { wid } = req.params;
        const updatedWorkout = req.body;

        const workout = await Workout.update(updatedWorkout, {
            where: {
                id: wid
            }
        })
        res.send(workout, "Your account has been successfully updated")
    } catch(error) {
        console.log("error from put/users.js:", error)
        next(error)
    }
})

// DELETE - delete workout
router.delete(':id/workout/:wid', async (req, res) => {
    try {
        const { id, wid } = req.params;

        // const user = await User.findByPk(id)
        // CONFIRM THAT WHEN WORKOUT = DESTROYED, IT'S REMOVED FROM USER WORKOUTS
        const workout = await Workout.findByPk(wid)
        await workout.destroy()
        res.send("Workout has been successfully deleted.")
        // REDIRECT: IF ON ALL WORKOUTS PAGE DON'T REDIRECT, IF ON SINGLE WORKOUT PAGE REDIRECT
    } catch(error) {
        console.log("error from delete/users.js:", error)
        next(error)
    }
})

module.exports = router;