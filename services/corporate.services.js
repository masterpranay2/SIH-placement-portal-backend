const CorporateModel = require('../models/corporate.model')
const createError = require('http-errors')

class CorporateService {
  
  async findCorporate(filter){
    try{
      const corporate = await CorporateModel.find(filter)
      return corporate
    } catch(err) {
      throw createError.InternalServerError(err.message || err)
    }
  }

  async createCorporate(corporate){
    try{
      const newCorporate = await CorporateModel.create(corporate)
      return newCorporate
    } catch(err) {
      throw createError.InternalServerError(err.message || err)
    }
  }

  async findAllCorporatesName(){
    try{
      const corporates = await CorporateModel.find().populate('email').lean()
      // TODO: remove email from response
      return corporates.map(corporate => {
        return {
          id: corporate._id,
          corporate_name: corporate.corporate_name
        }
      }
      )
    } catch(err) {
      throw createError.InternalServerError(err.message || err)
    }
  }

}

module.exports = new CorporateService()