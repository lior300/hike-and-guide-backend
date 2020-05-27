const express = require('express');
// const { requireAuth } = require('../../middlewares/requireAuth.middleware');
const { getTrail, getTrails, deleteTrail, updateTrail } = require('./trail.controller');
const router = express.Router()

router.get('/', getTrails)
router.get('/:id', getTrail)
router.put('/:id', updateTrail)
router.delete('/:id', deleteTrail)

module.exports = router
