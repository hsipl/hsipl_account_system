const app = require("../../app.js");
const req = require("supertest")(app);
const User = require("../../model/user");
const mongoose = require("mongoose");
const { testUser, getToken } = require("../testUser");

let token;
beforeAll(async () => {
  await mongoose.connect(
    "mongodb+srv://p5341500:5341500@cluster0.n2jal.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  await User.deleteMany();
  token = await getToken();
});

afterAll(async () => {
  await User.deleteMany();
  mongoose.disconnect();
});

describe("GET /api/fund", () => {
  test("success", async () => {
    const res = await req
      .get("/api/fund")
      .set("Authorization", token)
      .expect(200)
      .expect("Content-Type", /json/);
    expect(res.body).toStrictEqual([]);
  });
  test("error", async () => {
    const res = await req
      .get("/api/fund")
      .expect(401)
      .expect("Content-Type", /json/);
    expect(res.body).toStrictEqual({"msg":"token wrong,please login again."});
  });
});


