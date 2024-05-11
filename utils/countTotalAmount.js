const db = require('../models/index')
const Fund = db.Fund

const conutTotalAmount = async (name) => {
    let nameAllPaidSum = 0
    const nameAllPaid = await Fund.findAll({ where: { name: name }})
  
    nameAllPaid.forEach((content) => {
      if (content.tag === 'REMITTER') {
        nameAllPaidSum -= content.sum
      } else {
        nameAllPaidSum += content.sum
      }
    })
  
    return nameAllPaidSum
  }

module.exports = { conutTotalAmount }