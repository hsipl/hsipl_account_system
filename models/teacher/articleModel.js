module.exports = (sequelize, DataTypes) =>{
    const Articles = sequelize.define('Articles',{
        num:{
            type: DataTypes.INTEGER,
            allowNull: false,                                     
        },
        author:{
            type: DataTypes.STRING,
            allowNull: false,                                     
        },
        article:{
            type:DataTypes.STRING,
            allowNull: false, 
        },
        reference:{
            type: DataTypes.STRING,
            allowNull: false, 
        }
    },{
        timestamps: false
    })

    return Articles
}