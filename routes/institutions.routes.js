const express = require('express')
const router = express.Router()

const ValidateInstitution = require('../middlewares/validateInstitutions')
const AuthController = require('../controllers/auth.controller')
const ListController = require('../controllers/list.controller')

router.post('/login', ValidateInstitution.login, AuthController.loginInstitution)
router.post('/register', ValidateInstitution.register, AuthController.registerInstitution)
router.post('/logout', AuthController.logout)
router.post('/uploadStudentData', ValidateInstitution.uploadStudentData, AuthController.uploadStudentData)
router.get('/all', ListController.getAllInstitutionsName)

module.exports = router