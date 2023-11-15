module.exports = (sequelize, DataTypes) =>{
    const Conference = sequelize.define('Conference',{
        year:{
            type: DataTypes.STRING,
            allowNull: false,                                     
        },
        author:{
            type: DataTypes.STRING,
            allowNull: false,                                     
        }
    },{
        timestamps: false
    })

    return Conference
}