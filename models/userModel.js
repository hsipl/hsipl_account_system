module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define('User', {
        name:{
            type:DataTypes.STRING,
        },
        username:{
            type:DataTypes.STRING,
        },
        password:{
            type:DataTypes.STRING,
        },
        img:{
            type: DataTypes.STRING,                                
        },
        studentID:{
            type: DataTypes.STRING,
        },
        mail:{
            type: DataTypes.STRING,
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
        },
        resetPasswordToken:{
            type: DataTypes.STRING
        },
        resetPasswordExpires:{
            type: DataTypes.DATE
        }
        
    },{
        paranoid: true,
    });


    return User;
};