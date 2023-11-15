const router = require('express').Router()
const passport = require('passport')
require ('../config/passport')(passport)

router.get('/google', passport.authenticate('google', { scope:[ 'email', 'profile' ] }))
router.get('/google/callback',
    passport.authenticate( 'google', {
        successRedirect: 'http://localhost:6969/api/user/protected', 
        failureRedirect: 'http://localhost:6969/api/user/login' 
}))



module.exports = router