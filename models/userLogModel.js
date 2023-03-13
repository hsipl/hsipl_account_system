module.exports = (sequelize, DataTypes) =>{
    const UserLog = sequelize.define('UserLog',{
        message:{
            type:DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: true
    })

    return UserLog
}