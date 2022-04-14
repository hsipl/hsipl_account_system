const Sequelize = require('sequelize')



module.exports = (sequelize, DataTypes) =>{
    const Members = sequelize.define('Members',{
        tag:{
            type:DataTypes.STRING
        },
        img:{
            type:DataTypes.STRING,
            allowNull: false
        },
        researchDirection:{
            type:DataTypes.STRING
        },
        mail:{
            type:DataTypes.STRING
        },
        paperTopic:{
            type:DataTypes.STRING
        }
    },{
        timestamps: false
    })

    return Members
}