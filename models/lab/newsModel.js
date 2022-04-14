const Sequelize = require('sequelize')
const moment = require('moment-timezone')


module.exports = (sequelize, DataTypes) =>{
    const News = sequelize.define('News',{
        date:{
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false,                                     
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            }
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

    return News
}