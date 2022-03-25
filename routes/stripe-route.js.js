const { setOrder } = require('../controllers/OrderController');
const verifyToken = require('../middlewares/auth');

const router = require('express').Router();

router.post('/pay',verifyToken ,setOrder);

module.exports = router 