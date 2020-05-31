const express = require('express')
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getUser, getUsers, deleteUser, updateUser, addTrailToGuide } = require('./user.controller')
const router = express.Router()


router.get('/', getUsers)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.post('/add_trail', addTrailToGuide)

module.exports = router
