const dbConfig = require('../config/db.config');

const Sequelize = require('sequelize');
console.log(dbConfig )
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
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
db.Equipment = require('./lab/equipmentModel')(sequelize, Sequelize);
db.Education = require("./teacher/educationModel")(sequelize, Sequelize);
db.ResearchExperience = require("./teacher/researchExperienceModel")(sequelize, Sequelize);
db.Articles = require("./teacher/articleModel")(sequelize, Sequelize);
db.Talks = require("./teacher/talksModel")(sequelize, Sequelize);
db.Conference = require("./teacher/conferenceModel")(sequelize, Sequelize);
db.TeacherAwards = require("./teacher/teacherAwardsModel")(sequelize, Sequelize);
db.Service = require("./teacher/serviceModel")(sequelize, Sequelize);
db.UserLog = require("./userLogModel")(sequelize, Sequelize);

db.User.hasMany(db.Fund,{
    foreignKey: 'userId'
})
db.Fund.belongsTo(db.User,{
    foreignKey: 'userId'
})


module.exports = db;