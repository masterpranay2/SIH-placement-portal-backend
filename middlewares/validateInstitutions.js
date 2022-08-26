const Joi = require('joi')

const InstitutionSchemaRegister = Joi.object({
  email : Joi.string().email().required(),
  password : Joi.string().min(6).required(),
  institutionid : Joi.string().required(),
  institutionname : Joi.string().required(),
})

const InstitutionSchemaLogin = Joi.object({
  email : Joi.string().email().required(),
  password : Joi.string().min(6).required()
})

const StudentSchemaRegister = Joi.object({
  email : Joi.string().email().required(),
  institution : Joi.string().required(),
  companyname : Joi.string().required(),
  degree : Joi.string().required(),
  name : Joi.string().required(),
  branch: Joi.string().required(),
  aadharnumber : Joi.number().integer().required(),
  ishighereducationopted : Joi.string().required(),
  passingyear : Joi.number().integer().required(),
  skills : Joi.string().required(),
  cgpa: Joi.number().required()
})

const validateStudents = (students) => {
  return new Promise((resolve, reject) => {
    const errorIndex = []
    students.forEach(async (st,index) => {
      try {
        const student = await StudentSchemaRegister.validateAsync(st)
      } catch(err) {
        errorIndex.push(index)
      }
      if(index === students.length - 1) {
        resolve(errorIndex)
      }
    })
  })
}

class ValidateInstitution {
  async register(req, res, next) {
    try {
      const institution = await InstitutionSchemaRegister.validateAsync(req.body)
      req.institution = institution
      next()
    } catch(err) {
      if(err.isJoi) err.status = 422
      next(err)
    }
  }

  async login(req, res, next) {
    try {
      const institution = await InstitutionSchemaLogin.validateAsync(req.body)
      req.institution = institution
      next()
    } catch(err) {
      if(err.isJoi) err.status = 422
      next(err)
    }
  }

  async uploadStudentData(req, res, next) {
      const students = req.body.students
      const errorIndex = await validateStudents(students)
      
      console.log(errorIndex, "errorIndex")
      const filteredStudents = await students.filter((st,index) => {
        return !errorIndex.includes(index)
      })
      console.log(filteredStudents.length)
      req.body.students = filteredStudents
      req.body.errorIndex = errorIndex
      next()
  }
}

module.exports = new ValidateInstitution()