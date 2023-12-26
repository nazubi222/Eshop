const express = require('express')
const router = express.Router()
const PaymentController = require('../controllers/PaymentController')
router.get('/config', PaymentController.getId)




module.exports = router