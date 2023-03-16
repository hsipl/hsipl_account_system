const db = require('../models/index')
const Fund = db.Fund
const { Op } = require('@sequelize/core')

const conutTotalAmout = async (name) => {
    let nameAllPaidSum = 0
    const nameAllPaid = await Fund.findAll({
      where: {
        [Op.or]: [
          { payer: name },
          { transferFrom: name},
          { transferTo: name },
        ]
      }
    })
  
    nameAllPaid.forEach((content) => {
      if (content.transferFrom === name) {
        nameAllPaidSum -= content.sum
      } else {
        nameAllPaidSum += content.sum
      }
    })
  
    return nameAllPaidSum
  }

module.exports = { conutTotalAmout }