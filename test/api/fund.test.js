const app = require("../../app.js");
const req = require("supertest")(app);
const User = require("../../model/user");
const mongoose = require("mongoose");
const { testUser, getToken } = require("../testUser");
const { MongoMemoryServer } = require("mongodb-memory-server");

let token;
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
  token = await getToken();
});

afterAll(async () => {
  await User.deleteMany();
  await mongoose.disconnect();
  await mongoose.connection.close()
  // process.exit(0)
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


