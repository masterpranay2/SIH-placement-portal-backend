const InstitutionModel = require('../models/institution.model')
const createError = require('http-errors')

class InstitutionService {
  
  async findInstitution(filter){
    try{
      const institution = await InstitutionModel.find(filter)
      return institution
    } catch(err) {
      throw createError.InternalServerError(err.message || err)
    }
  }

  async createInstitution(institution){
    try{
      const newInstitution = await InstitutionModel.create(institution)
      return newInstitution
    } catch(err) {
      throw createError.InternalServerError(err.message || err)
    }
  }

  async findAllInstitutionsName(){
    try{
      const institutions = await InstitutionModel.find().populate('email').lean()
      // TODO: remove email from response
      return institutions.map(institution => {
        return {
          id: institution._id,
          institutionname: institution.institutionname
        }
      }
      )
    } catch(err) {
      throw createError.InternalServerError(err.message || err)
    }
  }

}

module.exports = new InstitutionService()