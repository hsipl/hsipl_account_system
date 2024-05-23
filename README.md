# HSIPL Account System v1.0.0

![Express Version](https://img.shields.io/badge/Express-4.17.1-green.svg)
![Redis Version](https://img.shields.io/badge/Redis-%5E4.6.13-red.svg)
![Sequelize Version](https://img.shields.io/badge/Sequelize-%5E6.15.0-yellow.svg)
![Docker Version](https://img.shields.io/badge/Docker-24.0.2-blue.svg)

## Description

This account system is for the Lab HSIPL at NYUST. It assists lab members with member login, recording expenses, and fund transfers.

## Data Structure

```plaintext
.
├── Dockerfile
├── app.js
├── config
│   ├── auth.config.js
│   ├── db.config.js
│   ├── mail.config.js
│   ├── googleAuth.config.js
│   └── redisClient.config.js
├── controllers
│   ├── fundController.js
│   ├── profileController.js
│   ├── publicController.js
│   └── userController.js
├── docker-compose.yml
├── document.txt
├── dump.rdb
├── hsipl_account_system.postman_collection.json
├── middleware
│   ├── fileDelete.js
│   ├── errorHandler.js
│   ├── fileUpload.js
│   ├── sessionIdController.js
│   └── tokenController.js
├── models
│   ├── fundModel.js
│   ├── fundTransferLogModel.js
│   ├── index.js
│   ├── permissionModel.js
│   ├── roleModel.js
│   ├── rolePermissionModel.js
│   ├── userLogModel.js
│   ├── userModel.js
│   └── userRoleModel.js
├── package-lock.json
├── package.json
├── redis.conf
├── routes
│   ├── authRoute.js
│   ├── fundRoute.js
│   ├── labRoute.js
│   ├── profileRoute.js
│   ├── publicRoute.js
│   ├── teacherRoute.js
│   └── userRoute.js
├── server.js
├── structure.txt
├── swagger.yml
├── utils
│   ├── countTotalAmount.js
│   ├── encryptPassword.js
│   └── sessionUtils.js
└── yarn.lock
```

## Installing & using

### .env settings

#### Keys

- `JWT_SECRET`: 
- `SESSION_SECRET`: 

#### Nodemailer 

- `MAIL_USER`
- `MAIL_PASSWORD`

#### Sequelize connection 

- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_DB`

#### Redis connection 
- `REDIS_HOST`
- `REDIS_PORT`

#### Google Oauth 
- `GOOGLE_OAUTH_CLIENT_ID`
- `GOOGLE_OAUTH_CLIENT_SECRECT`
- `GOOGLE_OAUTH_CALLBACK`

### 下載專案

```git clone https://github.com/Jie0906/HSIPL_algorithm.git```

### 安裝相關套件

```npm install```


### 在本地開啟服務

```npm run dev```




