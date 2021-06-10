const app = require("../app");
const req = require("supertest")(app);
let data = {
  name: "testing",
  username: "test",
  password: "test",
};
const testUser = async () => {
  const res = await req.post("/api/user").send(data).set('X-Forwarded-For', '140.125.45.162');
  return res;
};

const getToken = async () => {
  const register = await testUser();
  const res = await req.post("/api/user/login").send(data);
  const token = "Bearer " + res.body.token;
  return token
};
console.log("this is test")

module.exports = {testUser,getToken};
