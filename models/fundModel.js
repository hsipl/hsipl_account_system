const Sequelize = require('sequelize')
const moment = require('moment-timezone')

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
        createdAt:{
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false,                                     
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        updatedAt:{
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false,
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
 
        /*,
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
        timestamps: false
    });





    return Fund;
};