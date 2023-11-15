require('dotenv').config()
const db = require('../models/index')
const User = db.User
const passport = require('passport')
const bcrypt = require('bcrypt')
const GoogleStrategy = require('passport-google-oauth2').Strategy
const jwt = require('jsonwebtoken')
const TokenController = require('../middleware/tokenController')

module.exports = ((passport) => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRECT,
    callbackURL: process.env.GOOGLE_OAUTH_CALLBACK,
    passReqToCallback: true
  },
  (req, accessToken, refreshToken, profile, done) => {
    authenticateWithGoogle(req, req.res, accessToken, refreshToken, profile, done)
  }
  ))
})
// 處理oauth登入後邏輯
const authenticateWithGoogle = async (req, res, accessToken, refreshToken, profile, done) => {
  try {
    const { email, name } = profile._json;
    const mail = email;
  
    // 查找用户是否已註册
    let user = await User.findOne({ where: { mail: mail } });
  
    if (user) {
      const payload = {
        name,
        mail
    }
      const token = await TokenController.signToken({payload})
      res.cookie('token', token, {httpOnly: true})
      // 如果用户已存在，完成身份驗證
      console.log({
        "message": "'User already exists, login successfully'",
        "token": token 
      })
      return done(null, user)
    }
  
    // 如果用户不存在，创建一個隨機用戶儲存使用者資料
    user = await User.create({
      name,
      mail,
    })

    const payload = {
      name,
      mail
  }
    const token = await TokenController.signToken({payload})
    res.cookie('token', token, {httpOnly: true})
  
    // 完成身份驗證
    console.log({
      "message": "'User already exists, login successfully'",
      "token": token 
    })
    done(null, user);
  } catch (err) {

    console.error(err);
    return done(err, null);
  }
  
  }

passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})

  
