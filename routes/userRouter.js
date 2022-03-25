const express = require('express')
const router = express.Router()
const { register, registerValidation, login, loginValidation, resetLink, setNewPassword, deleteToken, passwordResetValidation } = require('../controllers/UserController');


router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/forget', resetLink)
router.post('/reset-password/change-new/:id/:token', passwordResetValidation,setNewPassword)

module.exports = router;