const { DataTypes } = require('sequelize')
const sequelize = require('../config/dbConn')

const UserRoles = sequelize.define('user_roles', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
})

module.exports = UserRoles
