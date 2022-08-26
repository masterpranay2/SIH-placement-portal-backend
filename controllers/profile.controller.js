const StudentService = require('../services/student.services')

class ProfileController {
  async getStudentProfile(req, res, next) {
    try {
      const { studentId } = req.params
      const student = await StudentService.findStudentWithPopulate({ _id: studentId })

      if(!student) {
        throw createError.NotFound('Student not found')
      }

      res.json(student)
    } catch(err) {
      next(err)
    }
  }
}

module.exports = new ProfileController()