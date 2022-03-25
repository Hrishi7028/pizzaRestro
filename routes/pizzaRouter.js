const express = require('express')
const { createPizza, deletePizza, updatePizza, getAllPizza, getSinglePizza } = require('../controllers/PizzaController')
const verifyToken = require('../middlewares/auth')
const router = express.Router()

// getting all pizza list
router.get('/getAll',getAllPizza)

// get single pizza details
router.get('/get_single_pizza/:id', verifyToken,getSinglePizza)

// creating single pizza 
router.post('/create_pizza',verifyToken ,createPizza)

// deleting pizza
router.delete('/delete_pizza/:id',verifyToken, deletePizza)

//updating single pizza
router.put('/update_details/:id',verifyToken ,updatePizza)


module.exports = router