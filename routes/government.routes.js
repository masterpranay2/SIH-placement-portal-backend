const express = require('express')
const router = express.Router()

const ValidateGovernment = require('../middlewares/validateGovernment')
const AuthController = require('../controllers/auth.controller')

router.post('/login', ValidateGovernment.login, AuthController.loginGovernment)
router.post('/register', ValidateGovernment.register, AuthController.registerGovernment)
router.post('/logout', AuthController.logout)

module.exports = router