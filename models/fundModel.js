const Sequelize = require('sequelize')
const moment = require('moment-timezone')
module.exports = (sequelize, DataTypes) =>{
    const Fund = sequelize.define('Fund', {
        type:{
            type:DataTypes.STRING,
            allowNull: false
        },
        items:{
            type:DataTypes.STRING,
            allowNull: false
        },
        cost:{
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        },
        purchaseDate:{
            type:DataTypes.DATE,
            allowNull: false
          
        },
        createdAt:{
            type: DataTypes.DATE,                                     
            allowNull: false,
            defaultValue: Date.now()
        },
        updatedAt:{
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Date.now()
        }
        
        /*,
        payerId:{
            type:DataTypes.STRING,
            allowNull: false
            
        },
        recorderName:{
            type:DataTypes.STRING,
            allowNull: false
            
        },
        recorderIp:{
            type:DataTypes.INTEGER,
            allowNull: false
        
        },
        isDelete:{
            type:DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        }*/
        
    },{
        timestamps: true
    });



    return Fund;
};