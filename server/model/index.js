const { User } = require('./User');
const { Workout } = require('./Workout');
const { db } = require('../database');

User.hasMany(Workout)
Workout.belongsTo(User)

module.exports = {
    User,
    Workout,
    db
};
