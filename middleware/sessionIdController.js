const errorHandler = require("./errorHandler")
const redis = require('redis')
const { generateSessionId } = require('../utils/sessionUtils')
class SessionIdController  {

    async gernerateSessionId(userId){
        try{
            // 創建redisClient
            const redisClient = redis.createClient({
                url: 'redis://127.0.0.1:6379'
            })
            await redisClient.connect()
            redisClient.on('error', (err) => {
                console.error('Redis server error:', err);
            })
            redisClient.on('connect', () => {
                console.log('Connected to Redis server successfully!');
            })
            const sessionIdKey = `userId:${userId}` //創建sessionId 映射 userId
            const redisSessionIdExist = await redisClient.GET(sessionIdKey) //由sessionIdKey 查詢user 是否存在
            let sessionId
            if (!redisSessionIdExist) { // 如user不存在則生成新的 sessionID
              sessionId = String(generateSessionId())
              // 創建 sessionData 儲存用戶登入狀態
              const sessionData = {
                  userId: userId,
                  loggedIn: true // 用户的登入狀態
              }
              await redisClient.set(sessionId, JSON.stringify(sessionData))
              await redisClient.expire(sessionId, '3600')
              await redisClient.set(sessionIdKey, sessionId, 'EX','3600')
              await redisClient.expire(sessionIdKey, '3600')
              console.log(`Generated new sessionId: ${sessionId}`)
          }
          else{
              //若user已存在
              sessionId = redisSessionIdExist
              const data = await redisClient.get(String(sessionId));
                  if (data) {
                      const updatedSessionData = JSON.parse(data);
                      await redisClient.expire(sessionId, '3600')
                      await redisClient.expire(sessionIdKey, '3600')
                      console.log(`Refeshed the sessionId: ${sessionId}`)
                  } else {
                      console.error(`Failed to refresh the session data for sessionId: ${sessionId}`);
                  }
          }
          return sessionId
        }catch(err){
            console.log(err)
            return false
        }
    }
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
            if (!sessionData){
                return res.status(401).send(errorHandler.tokenError());
            }
            const parseSessionData = JSON.parse(sessionData)
            //console.log(sessionId,'$$$')
            //console.log(parseSessionData.loggedIn,typeof(parseSessionData),'###')
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

module.exports = new SessionIdController()