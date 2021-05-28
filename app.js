const express = require("express");
const bodyparser = require("body-parser")
const cors = require("cors")
const connectDb = require("./server/db");
const apiErrorHandler = require("./middleware/api-errorHandler")
const userSchema = require("./model/user");
const userRoute = require("./router/user")
const fundRoute = require("./router/fund")
const app = express();

connectDb();
app.use(cors())
app.use(bodyparser.json())
app.use("/api/user",userRoute)
app.use("/api/fund",fundRoute)
app.get("/test", (req, res) => {
  res.json({
    status: 200,
    info: "ok",
  });
});

app.use(apiErrorHandler);
app.listen(3000, () => {
  console.log("server is running on 3000.");
});
