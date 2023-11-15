module.exports = (sequelize, DataTypes) =>{
    const FundTransferLog = sequelize.define('FundTransferLog',{
        transferLog:{
            type:DataTypes.STRING,
            allowNull: false
        },
        date: {
            type:DataTypes.STRING,
            allowNull: false
        }
    },{
        paranoid: true,
    })

    return FundTransferLog
}