module.exports = (sequelize, DataTypes) =>{
    const Education = sequelize.define('Education',{
        year:{
            type: DataTypes.STRING,
            allowNull: false,                                     
        },
        instiution:{
            type:DataTypes.STRING,
            allowNull: false, 
        },
        major:{
            type: DataTypes.STRING,
            allowNull: false, 
        },
        degree:{
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: false
    })

    return Education
}