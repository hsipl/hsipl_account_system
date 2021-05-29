const app = require("../app");
const req = require("supertest")(app);
let data = {
  name: "testing",
  username: "test",
  password: "test",
};
const testUser = async () => {
  const res = await req.post("/api/user").send(data);
  return res;
};

const getToken = async () => {
  const register = await testUser();
  const res = await req.post("/api/user/login").send(data);
  const token = "Bearer " + res.body.token;
  return token
};

module.exports = {testUser,getToken};
