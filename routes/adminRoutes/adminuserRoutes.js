const express = require('express');
const router = express.Router()
const { getAllUsers, deleteUser, updateUserRole } = require('../../controllers/adminController/UserController');

router.get('/allusers',getAllUsers)

router.delete('/delete_user/:id',deleteUser)

router.put('/admin/update_user_profile/:id', updateUserRole);

module.exports = router;