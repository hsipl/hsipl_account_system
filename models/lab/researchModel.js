module.exports = (sequelize, DataTypes) =>{
    const Research = sequelize.define('Research',{
        title:{
            type:DataTypes.STRING,
            allowNull: false
        },
        img:{
            type:DataTypes.STRING,
            allowNull: false
        },
        content:{
            type:DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: false
    })

    return Research
}