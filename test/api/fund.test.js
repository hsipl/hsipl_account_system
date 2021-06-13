const app = require("../../app.js");
const req = require("supertest")(app);
const User = require("../../model/user");
const Funding = require("../../model/funding");
const mongoose = require("mongoose");
const { testUser, getToken } = require("../testUser");
const { MongoMemoryServer } = require("mongodb-memory-server");

let token;
let payerId;
let fundId;
beforeAll(async () => {
  const mongoServer = new MongoMemoryServer();
  app.enable("trust proxy");
  mongoServer.getUri().then(async (mongoUri) => {
    const mongooseOpts = {
      // options for mongoose 4.11.3 and above
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
    };
    await mongoose.connect(mongoUri, mongooseOpts);
    mongoose.connection.on("error", (e) => {
      if (e.message.code === "ETIMEDOUT") {
        console.log(e);
        mongoose.connect(mongoUri, mongooseOpts);
      }
      console.log(e);
    });

    mongoose.connection.once("open", () => {
      console.log(`MongoDB successfully connected to ${mongoUri}`);
    });
  });
  await User.deleteMany();
  const testUser = await User.create({
    "username": "testPayer",
    "password": "testPayer",
    "name": "testPayer"
  });
  // const testFund = await Funding.create({
  //   "types": "test",
  //   "items": "test",
  //   "cost": "300",
  //   "purchaseDate": "2021/06/11",
  //   "payer_id": testUser._id
  // });
  // fundId = testFund._id;
  payerId = testUser._id;
  token = await getToken();
});

afterAll(async () => {
  await User.deleteMany();
  await Funding.deleteMany();
  await mongoose.disconnect();
  await mongoose.connection.close()
});
/** getAll 測試 */
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
    expect(res.body).toStrictEqual({ "msg": "token wrong,please login again." });
  });
});
/** 尚未修改 */
// describe("GET /api/fund/:fundingId", () => {
//   test("success", async () => {
//     const res = await req
//       .get("/api/fund/" + fundId)
//       .set("Authorization", token)
//       .expect(200)
//       .expect("content-Type", /json/);
//     expect(res.body).toStrictEqual([]);
//   });
// });
/** post 測試 */
describe("POST /api/fund", () => {
  let data = {
    "types": "test",
    "items": "test",
    "cost": "300",
    "purchaseDate": "2021/06/11",
    "payer_id": "",
  };
  test("success", async () => {
    data.payer_id = payerId;
    const res = await req
      .post("/api/fund")
      .set("Authorization", token)
      .send(data)
      .expect("content-Type", /json/)
      .expect(200);
  });
  test("error", async () => {
    data.payer_id = payerId;
    data.types = null;
    const res = await req
      .post("/api/fund")
      .send(data)
      .set("Authorization", token)
      .expect(400)
      .expect("Content-Type", /json/)
    expect(res.body).toStrictEqual({ "msg": "your info is wrong." });
  });
});


