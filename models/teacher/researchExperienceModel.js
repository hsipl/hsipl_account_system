module.exports = (sequelize, DataTypes) =>{
    const ResearchExperience = sequelize.define('ResearchExperience',{
        year:{
            type: DataTypes.STRING,
            allowNull: false,                                     
        },
        employer:{
            type:DataTypes.STRING,
            allowNull: false, 
        },
        position:{
            type: DataTypes.STRING,
            allowNull: false, 
        }
    },{
        timestamps: false
    })

    return ResearchExperience
}