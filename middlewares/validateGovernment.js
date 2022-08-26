const Joi = require('joi')

const GovernmentSchemaRegister = Joi.object({
  email : Joi.string().email().required(),
  password : Joi.string().min(6).required(),
})

const GovernmentSchemaLogin = Joi.object({
  email : Joi.string().email().required(),
  password : Joi.string().min(6).required()
})

class ValidateGovernment {
  async register(req, res, next) {
    try {
      const government = await GovernmentSchemaRegister.validateAsync(req.body)
      req.government = government
      next()
    } catch(err) {
      if(err.isJoi) err.status = 422
      next(err)
    }
  }

  async login(req, res, next) {
    try {
      const government = await GovernmentSchemaLogin.validateAsync(req.body)
      req.government = government
      next()
    } catch(err) {
      if(err.isJoi) err.status = 422
      next(err)
    }
  }
}

module.exports = new ValidateGovernment()