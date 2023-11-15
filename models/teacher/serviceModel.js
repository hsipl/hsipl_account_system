module.exports = (sequelize, DataTypes) =>{
    const Service = sequelize.define('Service',{
        tag:{
            type: DataTypes.INTEGER,
            allowNull: false,                                     
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,                                     
        },
        date:{
            type: DataTypes.STRING,                                     
        },
        place:{
            type: DataTypes.STRING,                                  
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false,                                     
        },
        
    },{
        timestamps: false
    })

    return Service
}