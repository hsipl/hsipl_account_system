const mongoose = require("mongoose");
const timeZone = require("mongoose-timezone");
const fundingSchema = new mongoose.Schema({
  types: {
    type: String,
    require: true,
  },
  items: {
    type: String,
    require: true,
  },
  cost: {
    type: Number,
    require: true,
  },
  purchaseDate: {
    type: Date,
    requrie: true,
  },
  payer_id: {
    type: "String",
    ref: "User",
  },
  recorder_name: {
    type: "String",
    ref: "User",
  },
  recorder_ip: {
    type: String,
    required: true,
  },
  isDelete: {
    type: Boolean,
    require: true,
    default: false,
  },
  createdAt: {
    type: String,
    require: true,
  },
  updatedAt: {
    type: Array,
    require: true,
  },
});
fundingSchema.pre("save", function (next) {
  this.createdAt = new Date().toLocaleString();
  this.updatedAt.push(new Date().toLocaleString());

  next();
});
fundingSchema.pre("findOneAndUpdate", function (next) {
  this._update["$push"] = { updatedAt: new Date().toLocaleString() };
  next();
});
const funding = mongoose.model("Funding", fundingSchema);

module.exports = funding;
