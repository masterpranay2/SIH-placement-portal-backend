const StudentService = require('../services/student.services')
const InstitutionService = require('../services/institution.services')
const CorporateService = require('../services/corporate.services')
const GovernmentService = require('../services/government.services')

const createError = require('http-errors')
const TokenService = require('../services/token.services')
const RefreshModel = require('../models/refreshToken.model')

const bcrypt = require('bcrypt')

class AuthController {

  async loginStudent(req, res, next) {
    // login student logic

    try {
      const { email, password } = req.student
      const student = await StudentService.findStudent({ email })

      if (!student) {
        throw createError.NotFound('Student not found')
      }

      const isValid = await bcrypt.compare(password, student.password)
      if (isValid) {
        const { accessToken, refreshToken } = await TokenService.generateTokens({ id: student._id })

        TokenService.setTokensInCookie(res, { accessToken, refreshToken })
        await TokenService.storeRefreshToken(student._id, refreshToken)
        res.json(student)
      }
    } catch (err) {
      next(err.message || err)
    }
  }

  async registerStudent(req, res, next) {
    // register student logic

    try {
      let { email, password, institution, companyname, degree, name, aadharnumber, branch, ishighereducationopted, passingyear, skills, cgpa } = req.student
      skills = skills.split(',')
      const student = await StudentService.findStudent({ email: email })

      if (student) {
        throw createError.Conflict('Student already exists')
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const newStudent = await StudentService.createStudent({ email, password: hashedPassword, institution: institution, companyname, degree, branch, name, aadharnumber, ishighereducationopted, passingyear, skills, cgpa })

      const { accessToken, refreshToken } = await TokenService.generateTokens({ id: newStudent._id })
      TokenService.setTokensInCookie(res, { accessToken, refreshToken })
      await TokenService.storeRefreshToken(newStudent._id, refreshToken)

      res.json(newStudent)

    } catch (err) {
      next(err)
    }
  }

  async logout(req, res, next) {
    // logout logic common for all types of users

    try {
      const refreshToken = req.cookies['aicte-refresh-token']
      const refreshTokenDoc = await RefreshModel.findOne({ token: refreshToken })

      if (!refreshTokenDoc) {
        throw createError.Unauthorized('Invalid refresh token')
      }

      await refreshTokenDoc.remove()
      res.clearCookie('aicte-access-token')
      res.clearCookie('aicte-refresh-token')
      res.json({ message: 'Logged out successfully' })
    } catch (err) {
      next(err)
    }
  }

  async registerInstitution(req, res, next) {
    try {
      const { email, password, institutionid, institutionname } = req.institution
      const institution = await InstitutionService.findInstitution({ email: email })

      if (institution.length > 0) {
        console.log('institution exists')
        throw createError.Conflict('Institution already exists!!')
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const newInstitution = await InstitutionService.createInstitution({ email, password: hashedPassword, institutionid, institutionname })

      const { accessToken, refreshToken } = await TokenService.generateTokens({ id: newInstitution._id })
      TokenService.setTokensInCookie(res, { accessToken, refreshToken })
      await TokenService.storeRefreshToken(newInstitution._id, refreshToken)

      res.json(newInstitution)

    } catch (err) {
      next(err)
    }
  }

  async loginInstitution(req, res, next) {
    try {
      const { email, password } = req.institution
      let institution = await InstitutionService.findInstitution({ email })
      if (institution.length === 0) {
        throw createError.NotFound('Institution not found')
      }
      institution = institution[0]
      const isValid = await bcrypt.compare(password, institution.password)
      if (isValid) {
        const { accessToken, refreshToken } = await TokenService.generateTokens({ id: institution._id })

        TokenService.setTokensInCookie(res, { accessToken, refreshToken })
        await TokenService.storeRefreshToken(institution._id, refreshToken)
        res.json(institution)
      }
    } catch (err) {
      next(err)
    }
  }

  async verifyStudent(req, res, next) {
    const { accessToken } = req.cookies
    const { studentId } = req.params

    try {
      const student = await StudentService.findStudent({ _id: studentId })

      if (!student) {
        throw createError.NotFound('Student not found')
      }

      const isValid = await TokenService.verifyAccessToken(accessToken, student._id)

      if (!isValid) {
        throw createError.Unauthorized()
      }

      next()
    } catch (err) {
      next(err)
    }
  }

  async registerCorporate(req, res, next) {
    try {
      const { email, password, companyname } = req.corporate
      const corporate = await CorporateService.findCorporate({ email: email })

      if (corporate.length > 0) {
        throw createError.Conflict('Corporate already exists')
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const newCorporate = await CorporateService.createCorporate({ email, password: hashedPassword, companyname })

      const { accessToken, refreshToken } = await TokenService.generateTokens({ id: newCorporate._id })
      TokenService.setTokensInCookie(res, { accessToken, refreshToken })
      await TokenService.storeRefreshToken(newCorporate._id, refreshToken)

      res.json(newCorporate)

    } catch (err) {
      next(err)
    }
  }

  async loginCorporate(req, res, next) {
    try {
      const { email, password } = req.corporate
      let corporate = await CorporateService.findCorporate({ email })
      if (corporate.length === 0) {
        throw createError.NotFound('Corporate not found')
      }
      corporate = corporate[0]
      const isValid = await bcrypt.compare(password, corporate.password)
      if (isValid) {
        const { accessToken, refreshToken } = await TokenService.generateTokens({ id: corporate._id })

        TokenService.setTokensInCookie(res, { accessToken, refreshToken })
        await TokenService.storeRefreshToken(corporate._id, refreshToken)
        res.json(corporate)
      }
    } catch (err) {
      next(err)
    }
  }

  async registerGovernment(req, res, next) {
    try {
      const { email, password } = req.government
      const government = await GovernmentService.findGovernment({ email: email })

      if (government.length > 0) {
        throw createError.Conflict('Government already exists')
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const newGovernment = await GovernmentService.createGovernment({ email, password: hashedPassword })

      const { accessToken, refreshToken } = await TokenService.generateTokens({ id: newGovernment._id })
      TokenService.setTokensInCookie(res, { accessToken, refreshToken })
      await TokenService.storeRefreshToken(newGovernment._id, refreshToken)

      res.json(newGovernment)

    } catch (err) {
      next(err)
    }
  }

  async loginGovernment(req, res, next) {
    try {
      const { email, password } = req.government
      let government = await GovernmentService.findGovernment({ email })
      if (government.length === 0) {
        throw createError.NotFound('Government not found')
      }
      government = government[0]
      const isValid = await bcrypt.compare(password, government.password)
      if (isValid) {
        const { accessToken, refreshToken } = await TokenService.generateTokens({ id: government._id })

        TokenService.setTokensInCookie(res, { accessToken, refreshToken })
        await TokenService.storeRefreshToken(government._id, refreshToken)
        res.json(government)
      }
    } catch (err) {
      next(err)
    }
  }

  async uploadStudentData(req, res, next) {
    const students = req.body.students
    const studentRegistered = []
    await new Promise((resolve, reject) => students.forEach(async (st) => {
      let { email, institution, companyname, degree, name, aadharnumber, branch, ishighereducationopted, passingyear, skills, cgpa } = st
      skills = skills.split(',')
      const student = await StudentService.findStudent({ email: email })

      if (student) {
        const updatedStudent = await StudentService.updateStudent({ email: email }, { institution, companyname, degree, name, aadharnumber, branch, ishighereducationopted, passingyear, skills, cgpa })
        studentRegistered.push(updatedStudent)
      } else {
        const newStudent = await StudentService.createStudent({ email, institution: institution, companyname, degree, branch, name, aadharnumber, ishighereducationopted, passingyear, skills, cgpa })
        studentRegistered.push(newStudent)
      }

      if (studentRegistered.length === students.length) {
        resolve()
      }
    }))
    res.json({
      students: studentRegistered,
      errorIndex: req.body.errorIndex
    })
  }
}

module.exports = new AuthController()