const mongoose = require("mongoose");

const fundingSchema = new mongoose.Schema(
  {
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    recorder_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    recorder_ip: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const funding = mongoose.model("Funding",fundingSchema)

module.exports = funding