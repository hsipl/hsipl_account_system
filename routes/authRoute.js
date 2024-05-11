const router = require('express').Router()
const passport = require('passport')
require ('../config/passport')(passport)

router.get('/google', passport.authenticate('google', { scope:[ 'email', 'profile' ] }))
router.get('/google/callback',
    passport.authenticate( 'google', {
        successRedirect: 'http://localhost:3000/api/user/protected', 
        failureRedirect: 'http://localhost:3000/api/user/login' 
}))



module.exports = router