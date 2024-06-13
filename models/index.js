const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');
require('dotenv').config()
const sequelize = new Sequelize(process.env.DB_DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: 3306,
    timezone: '+08:00',
    logging: false,
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
db.FundTransferLog = require("./fundTransferLogModel")(sequelize, Sequelize);
db.Role = require("./roleModel")(sequelize, Sequelize);
db.Permission = require("./permissionModel")(sequelize, Sequelize);
db.UserRole = require("./userRoleModel")(sequelize, Sequelize);
db.RolePermission = require("./rolePermissionModel")(sequelize, Sequelize);

//定義關聯
db.User.hasMany(db.Fund,{foreignKey: 'userId'})
db.Fund.belongsTo(db.User,{foreignKey: 'userId'})
db.FundTransferLog.hasMany(db.Fund,{foreignKey: 'transferId'})
db.Fund.belongsTo(db.FundTransferLog,{foreignKey: 'transferId'})
db.User.hasMany(db.UserLog,{foreignKey: 'userId'})
db.UserLog.belongsTo(db.User,{foreignKey: 'userId'})
db.User.belongsToMany(db.Role, {through: db.UserRole, foreignKey: 'userId'})
db.Role.belongsToMany(db.User, {through: db.UserRole, foreignKey: 'roleId'})
db.Role.belongsToMany(db.Permission,{through: db.RolePermission, foreignKey:'roleId'})
db.Permission.belongsToMany(db.Role,{through: db.RolePermission, foreignKey:'permissonId'})

module.exports = db;