module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define('User', {
        name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        username:{
            type:DataTypes.STRING,
            allowNull: false
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false
        },
        money:{
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        }
        
    },{
        timestamps: false
    });


    return User;
};