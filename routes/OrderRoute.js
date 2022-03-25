const router = require('express').Router();
const { getUserOrder } = require('../controllers/OrderController');
const Order = require('../models/OrderModel')

router.get('/user/allorders/:id',getUserOrder)


module.exports = router