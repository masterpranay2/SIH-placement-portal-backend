const Joi = require('joi')

const CorporateSchemaRegister = Joi.object({
  email : Joi.string().email().required(),
  password : Joi.string().min(6).required(),
  companyname : Joi.string().required(),
})

const CorporateSchemaLogin = Joi.object({
  email : Joi.string().email().required(),
  password : Joi.string().min(6).required()
})

class ValidateCorporate {
  async register(req, res, next) {
    try {
      const corporate = await CorporateSchemaRegister.validateAsync(req.body)
      req.corporate = corporate
      next()
    } catch(err) {
      if(err.isJoi) err.status = 422
      next(err)
    }
  }

  async login(req, res, next) {
    try {
      const corporate = await CorporateSchemaLogin.validateAsync(req.body)
      req.corporate = corporate
      next()
    } catch(err) {
      if(err.isJoi) err.status = 422
      next(err)
    }
  }
}

module.exports = new ValidateCorporate()