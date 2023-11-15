module.exports = (sequelize, DataTypes) =>{
    const Awards = sequelize.define('Awards',{
        date:{
            type: DataTypes.STRING,
            allowNull: false,                                     
        },
        img:{
            type:DataTypes.STRING,
            allowNull: false
        },
        content:{
            type:DataTypes.STRING
        }
    },{
        timestamps: false
    })

    return Awards
}