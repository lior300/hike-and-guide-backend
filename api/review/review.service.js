
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const COLLECTION_NAME = 'review'

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        const reviews = await collection.find(criteria).toArray();
        return reviews
    } catch (err) {
        console.log('ERROR: cannot find reviews')
        throw err;
    }
}

async function remove(reviewId) {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        await collection.deleteOne({ "_id": ObjectId(reviewId) })
    } catch (err) {
        console.log(`ERROR: cannot remove review ${reviewId}`)
        throw err;
    }
}

async function add(review) {
    console.log(review)
    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        review = await collection.insertOne(review);
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
        criteria.trail = { _id: ObjectId(filterBy.trailId) }
    }
    return criteria;
}

module.exports = {
    query,
    remove,
    add
}


