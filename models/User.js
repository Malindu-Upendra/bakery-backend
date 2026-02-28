const { DataTypes } = require('sequelize')
const sequelize = require('../config/dbConn')
const UserRoles = require('./UserRoles')

// statuses
// -4 Unauthorized
// 0 Pending
// 4 Approved

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING
    },
    birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 4
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: true
})

User.belongsTo(UserRoles, { foreignKey: 'roleId', as: 'role' })
UserRoles.hasMany(User, { foreignKey: 'roleId' })

module.exports = User
