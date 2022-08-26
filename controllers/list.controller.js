const InstitutionService = require('../services/institution.services')
const StudentService = require('../services/student.services')

class ListController {
  async getAllInstitutionsName(req, res, next) {
    try {
      const institutionsName = await InstitutionService.findAllInstitutionsName()
      res.json(institutionsName)
    } catch (err) {
      next(err)
    }
  }

  async getPlacementData(req, res) {
    try {
      if (req.body.role === 'institution') {
        const placementData = await StudentService.getPlacementData({ institution: req.body.id }, req.body.role)
        res.json({
          data: placementData
        })
      } else if (req.body.role === 'corporate' || req.body.role === 'government') {
        const placementData = await StudentService.getPlacementData({}, req.body.role)
        res.json({
          data: placementData
        })
      }
    } catch (err) {
      next(err)
    }
  }

  async getHigherEducationData(req, res) {
    try {
      if (req.body.role === 'institution') {
        const higherEducationData = await StudentService.getHigherEducationData({ institution: req.body.id })
        res.json({
          data: higherEducationData
        })
      } else if (req.body.role === 'corporate' || req.body.role === 'government') {
        const higherEducationData = await StudentService.getHigherEducationData({})
        res.json({
          data: higherEducationData
        })
      }
    } catch (err) {
      next(err)
    }
  }

  async getAllStudents(req, res) {
    try {
      if(req.body.role === 'institution') {
        const allStudents = await StudentService.getAllStudents({ institution: req.body.id })
        res.json({
          data: allStudents
        })
      } else if(req.body.role === 'corporate' || req.body.role === 'government') {
        const allStudents = await StudentService.getAllStudents({})
        res.json({
          data: allStudents
        })
      }
    } catch (err) {
      next(err)
    }
  }

  async getYearWisePlacementData(req, res) {
    try {
      if (req.body.role === 'institution') {
        const yearWisePlacementData = await StudentService.getYearWisePlacementData({ institution: req.body.id })
        res.json({
          data: yearWisePlacementData
        })
      } else if (req.body.role === 'corporate' || req.body.role === 'government') {
        const yearWisePlacementData = await StudentService.getYearWisePlacementData({})
        res.json({
          data: yearWisePlacementData
        })
      }
    } catch (err) {
      next(err)
    }
  }

  async getStudentCount(req, res) {
    try {
      if (req.body.role === 'institution') {
        const studentCount = await StudentService.getStudentCount({ institution: req.body.id })
        res.json({
          data: studentCount
        })
      } else if (req.body.role === 'corporate' || req.body.role === 'government') {
        const studentCount = await StudentService.getStudentCount({})
        res.json({
          data: studentCount
        })
      }
    } catch (err) {
      next(err)
    }
  }

  async getAllSkills(req, res, next) {
    try {
      const skills = await StudentService.getAllSkills({})
      res.json({
        data: skills
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new ListController()