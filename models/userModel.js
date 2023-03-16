module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define('User', {
        name:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        username:{
            type:DataTypes.STRING,
            allowNull: false
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false
        },
        img:{
            type: DataTypes.STRING,                                
        },
        studentID:{
            type: DataTypes.STRING,
        },
        mail:{
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNum: {
            type: DataTypes.STRING,
        },
        birthday: {
            type: DataTypes.STRING,
        },
        lineID: {
            type: DataTypes.STRING,
        },
        balance:{
            type:DataTypes.INTEGER,
            defaultValue:0
        }
        
    },{
        paranoid: true,
    });


    return User;
};