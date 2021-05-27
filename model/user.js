const mongoose = require("mongoose");
const timeZone = require("mongoose-timezone");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    money: {
      type: Number,
      require: true,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.plugin(timeZone);
const user = mongoose.model("User", userSchema);

module.exports = user;
