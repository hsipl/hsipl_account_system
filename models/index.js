const dbConfig = require('../config/db.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool:{
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    timezone: '+08:00'

});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./userModel")(sequelize, Sequelize);
db.Fund = require("./fundModel")(sequelize, Sequelize);
db.EventImg = require("./lab/eventImgModel")(sequelize, Sequelize);
db.Awards = require("./lab/awardsModel")(sequelize, Sequelize);
db.Members = require("./lab/membersModel")(sequelize, Sequelize);
db.News = require("./lab/newsModel")(sequelize, Sequelize);
db.Research = require("./lab/researchModel")(sequelize, Sequelize);
db.Projects = require("./lab/projectsModel")(sequelize, Sequelize);
db.Posters = require("./lab/postersModel")(sequelize, Sequelize);

db.User.hasMany(db.Fund,{
    foreignKey: 'userId'
})
db.Fund.belongsTo(db.User,{
    foreignKey: 'userId'
})


module.exports = db;