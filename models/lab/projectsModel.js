module.exports = (sequelize, DataTypes) =>{
    const Projects = sequelize.define('Projects',{
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        startDate:{
            type: DataTypes.DATE,
            allowNull: false
        },
        endDate:{
            type: DataTypes.DATE,
            allowNull: false
        },
        assistUnit:{
            type: DataTypes.STRING,
            allowNull: false
        },
        total:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        timestamps: false
    })

    return Projects
}