const Joi = require('joi')

const StudentSchemaRegister = Joi.object({
  email : Joi.string().email().required(),
  password : Joi.string().min(6).required(),
  institution : Joi.string().required(),
  companyname : Joi.string().required(),
  degree : Joi.string().required(),
  name : Joi.string().required(),
  branch: Joi.string().required(),
  aadharnumber : Joi.string().min(12).max(12).required(),
  ishighereducationopted : Joi.string().required(),
  passingyear: Joi.number().integer().min(2000).max(2022).required(),
  skills : Joi.string().required(),
  cgpa: Joi.number().required()
})

const StudentSchemaLogin = Joi.object({
  email : Joi.string().email().required(),
  password : Joi.string().min(6).required()
})

class ValidateStudent {
  async register(req, res, next) {
    try {
      const student = await StudentSchemaRegister.validateAsync(req.body)
      req.student = student
      next()
    } catch(err) {
      if(err.isJoi) err.status = 422
      next(err)
    }
  }

  async login(req, res, next) {
    try {
      const student = await StudentSchemaLogin.validateAsync(req.body)
      req.student = student
      next()
    } catch(err) {
      if(err.isJoi) err.status = 422
      next(err)
    }
  }
}

module.exports = new ValidateStudent()