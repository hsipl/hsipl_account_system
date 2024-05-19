const errorHandler = require("./errorHandler")
const redis = require('redis')
class VerifySessionId  {

    async verifySessionId (req, res, next){
        try{
            // 創建redisClient
            const redisClient = redis.createClient({
                url: 'redis://127.0.0.1:6379',
                no_ready_check: true
            })
            await redisClient.connect()
            redisClient.on('error', (err) => {
                console.error('Redis server error:', err);
            })
            redisClient.on('connect', () => {
                console.log('Connected to Redis server successfully!');
            })
            const sessionId = req.cookies.sessionId
            if (!sessionId) {
                return res.status(401).send(errorHandler.tokenError());
            }
            const sessionData = await redisClient.get(String(sessionId))
            const parseSessionData = JSON.parse(sessionData)
            //console.log(sessionId,'$$$')
            console.log(parseSessionData.loggedIn,typeof(parseSessionData),'###')
            if (parseSessionData.loggedIn === true){
                console.log('sessionId check ok')
                return next()
            }
            else{
                console.log('sessionId check did not pass')
                return res.status(401).json(errorHandler.tokenError);
            }

        }catch (error) {
            console.error(error)
            return res.status(500).json({
              message: error
            })
          }
    }
}

module.exports = new VerifySessionId()