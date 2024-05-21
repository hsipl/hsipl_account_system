module.exports = (sequelize, DataTypes) =>{
    const RolePermission = sequelize.define('RolePermission', {
    },{
        paranoid: true,
    });
    return RolePermission
};