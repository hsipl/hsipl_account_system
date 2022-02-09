const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development'; //環境變數預設為develop
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

//引入config.json存成變數config 並使用

const connectDb = async () =>{
  try{
    let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

//require相同根目錄底下的.js 以model.name當索引值放到db物件中
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes) 
    //const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

  //執行db物件裡的每一.associate method
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

  }
  catch (error) {
    console.log(error)
  }
}

module.exports = connectDb
