const GovernmentModel = require('../models/government.model');
const createError = require('http-errors')

class GovernmentService {
  
  async findGovernment(filter){
    try{
      const government = await GovernmentModel.find(filter)
      return government
    } catch(err) {
      throw createError.InternalServerError(err.message || err)
    }
  }

  async createGovernment(government){
    try{
      const newGovernment = await GovernmentModel.create(government)
      return newGovernment
    } catch(err) {
      throw createError.InternalServerError(err.message || err)
    }
  }

}

module.exports = new GovernmentService()