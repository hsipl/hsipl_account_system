module.exports = (sequelize, DataTypes) =>{
    const Talks = sequelize.define('Talks',{
        year:{
            type: DataTypes.STRING,
            allowNull: false,                                     
        },
        place:{
            type: DataTypes.STRING,
            allowNull: false,                                     
        },
        topic:{
            type:DataTypes.STRING,
            allowNull: false, 
        }
    },{
        timestamps: false
    })

    return Talks
}