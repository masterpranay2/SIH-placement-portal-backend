const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/auth.controller')
const ValidateStudent = require('../middlewares/validateStudent')
const ProfileController = require('../controllers/profile.controller')
const ListController = require('../controllers/list.controller')

router.post('/allskills', ListController.getAllSkills)
router.post('/placementdata', ListController.getPlacementData)
router.post('/yearwiseplacementdata', ListController.getYearWisePlacementData)
router.post('/highereducationdata', ListController.getHigherEducationData)
router.post('/allstudents', ListController.getAllStudents)
router.post('/getstudentcount', ListController.getStudentCount)
router.post('/register', ValidateStudent.register, AuthController.registerStudent)
router.post('/login', ValidateStudent.login, AuthController.loginStudent)
router.post('/logout', AuthController.logout)
router.get('/:studentId', AuthController.verifyStudent, ProfileController.getStudentProfile)

module.exports = router