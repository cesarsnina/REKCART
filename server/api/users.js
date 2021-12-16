const router = require('express').Router();
const { User, Workout } = require('../model');


//POST - login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({
        where: {
        email: email,
        password: password
        }
    })
    res.json(user)
})

// GET - retrieve one user
router.get('/:id', async(req,res) => {
    const id = req.params.id;
    let user = await User.findByPk(id);
    const userWorkouts = await user.getWorkouts()
    const data = {user: user, workouts: userWorkouts}
    console.log("BACKEND USER workouts", data)

    res.json(data); 
});

// MAKE SURE TO IMPLEMENT REDIRECT FEATURE FOR BOTH POST AND PUT (SEE PUT)
// POST - create user
router.post('/create-account', async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        res.send("You have successfully created your account :).")
    } catch (error) {
        console.log("error from post/users.js:", error)
        res.send("Could not create account at this time")
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

        res.send(workout)
    } catch (error) {
        console.log("error from post/workouts.js:", error)
        next(error)
    }
})

// GET - retrieve workout
router.get('/:id/workout/:wid', async (req, res, next) => {
    try {
        const { wid } = req.params;
        const workout = await Workout.findByPk(wid)

        res.json(workout)
    } catch(error) {
        console.log("error from get/users.js/workout:", error)
        next(error)
    }
})


// PUT - update workout
router.put('/:id/workout/:wid', async(req, res, next) => { // :wid - workout id
    try {
        const { wid } = req.params;
        const updatedWorkout = req.body;

        const workout = await Workout.update(updatedWorkout, {
            where: {
                id: wid
            }
        })
        res.send(workout)
    } catch(error) {
        console.log("error from put/users.js/workout:", error)
        next(error)
    }
})

// DELETE - delete workout
router.delete('/:id/workout/:wid', async (req, res, next) => {
    console.log("INSIDE DELETE BACKEND")
    try {
        const { wid } = req.params;

        const workout = await Workout.findByPk(wid)
        await workout.destroy()
        res.send("Workout has been successfully deleted.")
    } catch(error) {
        console.log("error from delete/users.js:", error)
        next(error)
    }
})

module.exports = router;
