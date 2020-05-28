const trailService = require('./trail.service')
const logger = require('../../services/logger.service')

async function getTrail(req, res) {
    const trail = await trailService.getById(req.params.id)
    res.send(trail)
}

async function getTrails(req, res) {
    const trials = await trailService.query(req.query)
    res.send(trials)
}

async function deleteTrail(req, res) {
    await trailService.remove(req.params.id)
    res.end()
}

async function updateTrail(req, res) {
    const trail = req.body;
    await trailService.update(trail)
    res.send(trail)
}

module.exports = {
    getTrail,
    getTrails,
    deleteTrail,
    updateTrail
}
