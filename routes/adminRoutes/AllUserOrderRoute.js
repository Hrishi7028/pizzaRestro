const router = require('express').Router();
const { getAllUserOrders, getSingleUserOrderDetail, updateOrderStatus } = require('../../controllers/adminController/AllUserOrders');




router.get('/api/admin/allUserOrders', getAllUserOrders)

router.get('/single_prod/:id', getSingleUserOrderDetail)

router.put('/admin/update/status/order', updateOrderStatus);



module.exports = router