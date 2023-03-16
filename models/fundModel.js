const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) =>{
    const Fund = sequelize.define('Fund', {
        type:{
            type:DataTypes.STRING,
            allowNull: true
        },
        content:{
            type:DataTypes.STRING,
            allowNull: false
        },
        payments:{
            type:DataTypes.STRING,
            allowNull: false
        },
        tag:{
            type:DataTypes.STRING,
            allowNull: false
        },
        price:{
            type:DataTypes.INTEGER,
            allowNull: true,
        },
        quantity:{
            type:DataTypes.INTEGER,
            allowNull: true,
        },
        sum:{
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        },
        payer:{
            type:DataTypes.STRING,
            allowNull:true
        },
        date:{
            type:DataTypes.STRING,
            allowNull: false
          
        },
        recorderName:{
            type:DataTypes.STRING,
            allowNull: true
        },
        note:{
            type:DataTypes.STRING,
            allowNull: true
        },
        transferFrom:{
            type:DataTypes.STRING,
            allowNull: true
        },
        transferTo:{
            type:DataTypes.STRING,
            allowNull: true
        },
   
    },{
        paranoid: true,
       
    });





    return Fund;
};