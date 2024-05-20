require('dotenv').config()
const db = require('../models/index')
const User = db.User
const passport = require('passport')
const bcrypt = require('bcryptjs')
const GoogleStrategy = require('passport-google-oauth2').Strategy
const jwt = require('jsonwebtoken')
const TokenController = require('../middleware/tokenController')
const SessionIdController = require('../middleware/sessionIdController')

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
    const { email, name } = profile._json
    const mail = email
    const payload = {name, mail}
    const jsonWebToken = await TokenController.signToken({payload})
    // 查找用户是否已註册
    const checkUserExist = await User.findOne({ where: { mail: mail } })
    // 若不存在則創建新用戶
    if (!checkUserExist) {
      const createUserForOauth = await User.create({name, mail})
      console.log('createUserForOauth',createUserForOauth)
      if (!createUserForOauth){
        return done(new Error('Failed to create user'), null);
      }}
      //獲取已建立的user資訊
      const getUserInfor = await User.findOne({ where: { mail: mail } })
      const sessionId = await SessionIdController.gernerateSessionId(getUserInfor.id)
      res.cookie('sessionId', sessionId, {httpOnly: true})
      res.cookie('jsonWebToken', jsonWebToken, {httpOnly: true})
      console.log({
        "message": `Use Google to login, welcome ${name}!`,
        "jsonWebToken": jsonWebToken,
        "sessionId": sessionId
      })
    return done(null, checkUserExist)
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

  
