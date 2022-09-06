module.exports = (sequelize, DataTypes) =>{
    const Equipment = sequelize.define('Equipment',{
        tag:{
            type: DataTypes.STRING,
            allowNull: false, 
        },
        img:{
            type: DataTypes.STRING,
            allowNull: false,                                     
        },
        title:{
            type:DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: false
    })

    return Equipment
}