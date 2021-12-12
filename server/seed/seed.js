const path = require('path');
const fs = require('fs').promises;

const { db, User, Workout } = require('../model');

const seed = async() => {
    await db.sync({force: true});


    const userPath = path.join(__dirname, 'user.json');
    const workoutPath= path.join(__dirname, 'workout.json');

    const userBuffer = await fs.readFile(userPath);
    const workoutBuffer = await fs.readFile(workoutPath);

    const { users } = JSON.parse(String(userBuffer));
    const { workouts } = JSON.parse(String(workoutBuffer));

    const userPromises = users.map(user => User.create(user));
    const workoutPromises = workouts.map(workout => Workout.create(workout));

    await Promise.all(userPromises);
    await Promise.all(workoutPromises);
   
    console.log('Data have been successfully added to our table');
}

seed();

module.exports = seed;
