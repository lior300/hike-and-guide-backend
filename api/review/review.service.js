
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('review')
    try {
        const reviews = await collection.find(criteria).toArray();
        return reviews
    } catch (err) {
        console.log('ERROR: cannot find reviews')
        throw err;
    }
}

async function remove(reviewId) {
    const collection = await dbService.getCollection('review')
    try {
        await collection.deleteOne({ "_id": ObjectId(reviewId) })
    } catch (err) {
        console.log(`ERROR: cannot remove review ${reviewId}`)
        throw err;
    }
}

async function add(review) {
    review.byUser._id = ObjectId(review.byUser._id);
    const collection = await dbService.getCollection('review')
    try {
        await collection.insertOne(review);
        return review;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.guideId) {
        criteria.guide = { _id: ObjectId(filterBy.guideId) }
    } else if (filterBy.trailId) {
        criteria.trail = { _id: ObjectId(filterBy.trail) }
    }
    return criteria;
}

module.exports = {
    query,
    remove,
    add
}


