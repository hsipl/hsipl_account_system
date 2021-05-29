const app = require("../../app.js");
const req = require("supertest")(app);
const User = require("../../model/user");
const mongoose = require("mongoose");
const { testUser, getToken } = require("../testUser");

beforeEach(async () => {
  await mongoose.connect(
    "mongodb+srv://p5341500:5341500@cluster0.n2jal.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  await User.deleteMany();
});

afterEach(async () => {
  await User.deleteMany();
  mongoose.disconnect();
});

describe("POST /api/user", () => {
  let data = {
    username: "123",
    password: "456",
  };   
  test("success", async () => {
    const res = await testUser();
    expect(res.status).toBe(201);
    expect(res.headers["content-type"]).toBe("application/json; charset=utf-8");
  });

  test("error", async () => {
    const res = await req.post("/api/user").send(data).expect(400);
  });
});

describe("POST /api/user/login", () => {
  test("success", async () => {
    const register = await testUser();
    let data = {
      name: "testing",
      username: "test",
      password: "test",
    };
    const res = await req
      .post("/api/user/login")
      .send(data)
      .expect(200)
      .expect("Content-Type", /json/);
  });
  test("error", async () => {
    let data = {
      name: "testing",
      username: "test",
      password: "test",
    };
    const res = await req
      .post("/api/user/login")
      .send(data)
      .expect(404)
      .expect("Content-Type", /json/);
  });
});

describe("GET /api/user", () => {
  test("success", async () => {
    const token = await getToken();
    const res = await req
      .get("/api/user")
      .set("Authorization", token)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  test("success", async () => {
    const token = await getToken();
    const res = await req
      .get("/api/user")
      .expect("Content-Type", /json/)
      .expect(401);
  });
});
