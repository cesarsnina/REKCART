const { db, DataTypes, Model } = require('../database');

class Workout extends Model {}

Workout.init({
    type: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    calories: DataTypes.INTEGER,
    date: DataTypes.DATE,
    time: DataTypes.INTEGER
},{
    sequelize: db,
    timestamps: false,
})

module.exports = { Workout };
