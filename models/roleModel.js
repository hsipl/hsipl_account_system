module.exports = (sequelize, DataTypes) =>{
    const Role = sequelize.define('Role', {
        name:{
            type:DataTypes.STRING,
        },
        description:{
            type:DataTypes.STRING,
        }
    },{
        paranoid: true,
    });
    return Role
};