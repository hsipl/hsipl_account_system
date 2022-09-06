module.exports = (sequelize, DataTypes) =>{
    const Projects = sequelize.define('Projects',{
        title:{
            type: DataTypes.STRING,
            allowNull: false
        },
        date:{
            type: DataTypes.STRING,
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