const express = require('express')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { addOrder, getOrders, deleteOrder, updateOrder, getOrder } = require('./order.controller')
const router = express.Router()

// router.use(requireAuth)

router.get('/', getOrders)
router.get('/:id', getOrder)
router.post('/', addOrder)
router.delete('/:id', deleteOrder)
router.put('/:id', updateOrder)

module.exports = router
