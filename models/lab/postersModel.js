module.exports = (sequelize, DataTypes) =>{
    const Posters = sequelize.define('Posters',{
        title:{
            type: DataTypes.STRING,
            allowNull: false,                                     
        },
        img:{
            type:DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: false
    })

    return Posters
}