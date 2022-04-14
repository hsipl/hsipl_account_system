const Sequelize = require('sequelize')



module.exports = (sequelize, DataTypes) =>{
    const ActImg = sequelize.define('ActImg',{
        img:{
            type:DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: false
    })

    return ActImg
}