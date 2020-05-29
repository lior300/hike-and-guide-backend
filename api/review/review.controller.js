const logger = require('../../services/logger.service')
const reviewService = require('./review.service')

async function getReviews(req, res) {
    try {
        const reviews = await reviewService.query(req.query)
        res.send(reviews)
    } catch (err) {
        logger.error('Cannot get reviews', err);
        res.status(500).send({ error: 'cannot get reviews' })

    }
}

async function deleteReview(req, res) {
    try {
        await reviewService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete review', err);
        res.status(500).send({ error: 'cannot delete review' })
    }
}

async function addReview(req, res) {
    var review = req.body;
    // console.log(review)
    // console.log("r.s.user",req.session.user)
    // review.by = req.session.user;
    review = await reviewService.add(review)
    res.send(review)
}

module.exports = {
    getReviews,
    deleteReview,
    addReview
}
