require('dotenv').config()
const redis = require('redis')

async function connectRedis() {
    const redisClient = redis.createClient({
        url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
    })
    redisClient.on('error', (err) => {
      console.error('Redis server error:', err);
    });
    redisClient.on('connect', () => {
      console.log('Connected to Redis server successfully!');
    });
    try {
      await redisClient.connect();
      console.log('Redis connection established.');
    } catch (err) {
      console.error('Failed to connect to Redis:', err);
    }
  
    return redisClient;
  }

  module.exports = connectRedis