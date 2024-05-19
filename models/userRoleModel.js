module.exports = (sequelize, DataTypes) =>{
    const UserRole = sequelize.define('UserRole', {
    },{
        paranoid: true,
    });
    return UserRole
};