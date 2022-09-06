module.exports = (sequelize, DataTypes) =>{
    const TeacherAwards = sequelize.define('TeacherAwards',{
        year:{
            type: DataTypes.STRING,
            allowNull: false,                                     
        },
        item:{
            type: DataTypes.STRING,
            allowNull: false,                                     
        },
        order:{
            type: DataTypes.STRING,
            allowNull: false,                                     
        },
    },{
        timestamps: false
    })

    return TeacherAwards
}