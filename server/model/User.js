const { db, DataTypes, Model } = require('../database.js');

class User extends Model {}

User.init({
    name: { 
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: 'blue'
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://www.thehoth.com/wp-content/uploads/2019/04/hoth-ranktracker-icon-002.png"
    }
},{
    sequelize: db,
    timestamps: false,
})

module.exports = { User };
