const User = require("../model/user");
const Funding = require("../model/funding");
const errorHandler = require("../middleware/errorHandler");
const {
  encrypt: encryptPassword,
  decrypt: decryptPassword,
} = require("../utils/encryptPassword");
const TokenController = require("../utils/tokenController");

class FundController {
  async getAll(req, res, next) {
    const allFunding = await Funding.find({ isDelete: false })
      .select("-recorder_ip -createdAt -updatedAt -__v -isDelete")
      .sort("-_id");
    res.status(200).json(allFunding);
  }
  async post(req, res, next) {
    const { types, items, cost, purchaseDate, payer_id } = req.body;
    const { ip } = req;
    const { name } = req.user;
    if (!types || !items || !cost || !purchaseDate || !payer_id) {
      return next(errorHandler.infoErr());
    }
    try {
      const funding = await Funding.create({
        types,
        items,
        cost,
        purchaseDate,
        payer_id,
        recorder_id: name,
        recorder_ip: ip,
      });
      res.status(200).json({
        id: funding._id,
        types: funding.types,
        items: funding.items,
        cost: funding.cost,
        purchaseDate: funding.purchaseDate,
        payer_id: funding.payer_id,
        recorder_id: funding.recorder_id,
      });
    } catch (error) {
      return next(errorHandler.infoErr());
    }
  }
  async getById(req, res, next) {
    const { fundingId } = req.params;
    if (!fundingId) {
      return next(errorHandler.infoErr());
    }
    try {
      const funding = await Funding.findById(fundingId).select(
        "-recorder_ip -createdAt -updatedAt -__v -isDelete"
      );
      res.status(200).json(funding);
    } catch (error) {
      return next(errorHandler.infoErr());
    }
  }
  async update(req, res, next) {
    const { fundingId } = req.params;
    const { types, items, cost, purchaseDate, payer_id } = req.body;
    if (!types || !items || !cost || !purchaseDate || !payer_id) {
      return next(errorHandler.infoErr());
    }
    if (!fundingId) {
      return next(errorHandler.infoErr());
    }
    try {
      const options = {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      };

      const funding = await Funding.findOneAndUpdate(
        {
          _id: fundingId,
        },
        {
          types,
          items,
          cost,
          purchaseDate,
          payer_id,
        },
        options
      ).select("-recorder_ip -createdAt -updatedAt -__v -isDelete");

      res.status(200).json(funding);
    } catch (error) {
      console.log(error);
      return next(errorHandler.infoErr());
    }
  }
  async delete(req, res, next) {
    const { fundingId } = req.params;
    if (!fundingId) {
      return next(errorHandler.infoErr());
    }
    try {
      const funding = await Funding.findOneAndUpdate(
        {
          _id: fundingId,
        },
        {
          isDelete: true,
        }
      ).select("-recorder_ip -createdAt -updatedAt -__v -isDelete");
      res.status(200).json({
        msg: "delete success.",
      });
    } catch (error) {}
  }
}

module.exports = new FundController();
