const { Fund } = require(".");

module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define('Fund', {
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
            allowNull: false,
            defaultValue:0
        },
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
        }
        
    },{
        timestamps: false
    });


   Fund.belongsTo(User,{})
    return Fund;
};