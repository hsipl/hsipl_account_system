const Sequelize = require('sequelize')
const moment = require('moment-timezone')


module.exports = (sequelize, DataTypes) =>{
    const News = sequelize.define('News',{
        date:{
            type: DataTypes.STRING,
            allowNull: false                                
        },
        img:{
            type:DataTypes.STRING,
            allowNull: false
        },
        content:{
            type:DataTypes.STRING
        }
    },{
        timestamps: false
    })

    return News
}