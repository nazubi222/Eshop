const express = require('express')
const router = express.Router()
const OrderController = require('../controllers/OrderController')
const { authMiddleware, authUserMiddleWare } = require('../middleware/authMiddleware');

router.post('/create/:id', authUserMiddleWare, OrderController.createOrder)
router.get('/get-all-order/:id',authUserMiddleWare, OrderController.getAllOrderDetails)
router.get('/get-details-order/:id', OrderController.getDetailsOrder)
router.post('/cancel-order/:id',authUserMiddleWare, OrderController.cancelOrderDetails)
router.get('/get-all-order', OrderController.getAllOrder)

module.exports = router