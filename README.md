# HSIPL_account_system v1.0.0

![Express Version](https://img.shields.io/badge/Express-4.17.1-green.svg)
![Redis Version](https://img.shields.io/badge/Redis-%5E4.6.13-red.svg)
![Sequelize Version](https://img.shields.io/badge/Sequelize-%5E6.15.0-yellow.svg)
![Docker Version](https://img.shields.io/badge/Docker-24.0.2-blue.svg)



## 專案說明

此專案為雲科大高光譜實驗室的記賬網站，可幫助實驗室成員紀錄支出,經費轉移等操作。

## 安裝與使用

### .env 說明

#### 相關金鑰

- `SECRET`: JWT金鑰
- `SESSION_SECRET`: session金鑰

#### nodemailer 設定

- `MAIL_USER`
- `MAIL_PASSWORD`

#### sequelize 連線設定

- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_DB`

#### Google Oauth 設定

- `GOOGLE_OAUTH_CLIENT_ID`
- `GOOGLE_OAUTH_CLIENT_SECRECT`
- `GOOGLE_OAUTH_CALLBACK`

### 下載專案

```git clone https://github.com/Jie0906/HSIPL_algorithm.git```

### 安裝相關套件

```npm install```


### 在本地開啟服務

```npm run dev```




