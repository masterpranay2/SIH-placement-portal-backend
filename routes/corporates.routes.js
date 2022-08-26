const express = require('express')
const router = express.Router()

const ValidateCorporate = require('../middlewares/validateCorporates')
const AuthController = require('../controllers/auth.controller')

router.post('/login', ValidateCorporate.login, AuthController.loginCorporate)
router.post('/register', ValidateCorporate.register, AuthController.registerCorporate)
router.post('/logout', AuthController.logout)

module.exports = router