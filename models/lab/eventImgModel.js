module.exports = (sequelize, DataTypes) =>{
    const EventImg = sequelize.define('EventImg',{
        img:{
            type:DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: false
    })

    return EventImg
}