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
        payer:{
            type:DataTypes.STRING,
            allowNull:false
        },
        purchaseDate:{
            type:DataTypes.STRING,
            allowNull: false
          
        },
        recorderName:{
            type:DataTypes.STRING,
            allowNull: false
            
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
        }
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