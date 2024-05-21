module.exports = (sequelize, DataTypes) =>{
    const Permission = sequelize.define('Permission', {
        name:{
            type:DataTypes.STRING,
        },
        description:{
            type:DataTypes.STRING,
        }
    },{
        paranoid: true,
    });
    return Permission
};