const { v4: uuidv4 } = require('uuid');

// 生成唯一的sessionId
const generateSessionId = () => {
    return uuidv4();
}

module.exports = {
    generateSessionId
};
