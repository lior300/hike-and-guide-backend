const express = require('express')
const {requireAuth}  = require('../../middlewares/requireAuth.middleware')
const {login, signup, logout} = require('./auth.controller')

const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.post('/login', login)
router.post('/signup', signup)
router.post('/logout', requireAuth, logout)

module.exports = router
