
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const COLLECTION_NAME = 'trail';

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        const trails = await collection.find(criteria).toArray();
        return trails
    } catch (err) {
        console.log('ERROR: cannot find trails')
        throw err;
    }
}

async function getById(trailId) {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        const trail = await collection.findOne({ "_id": ObjectId(trailId) })
        return trail
    } catch (err) {
        console.log(`ERROR: while finding trail ${trailId}`)
        throw err;
    }
}

async function remove(trailId) {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        await collection.deleteOne({ "_id": ObjectId(trailId) })
    } catch (err) {
        console.log(`ERROR: cannot remove trail ${trailId}`)
        throw err;
    }
}

async function update(trail) {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    trail._id = ObjectId(trail._id);

    try {
        await collection.replaceOne({ "_id": trail._id }, { $set: trail })
        return trail
    } catch (err) {
        console.log(`ERROR: cannot update trail ${trail._id}`)
        throw err;
    }
}

async function add(trail) {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        await collection.insertOne(trail);
        return user;
    } catch (err) {
        console.log(`ERROR: cannot insert trail`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.name) {
        criteria.name = { $regex: `/${filterBy.name}/`, $option: 'i' }
    }

    if (filterBy.country) {
        criteria.country = { $regex: `/${filterBy.country}/`, $option: 'i' }
    }

    if (filterBy.difficulty) {
        criteria.difficulty = { $regex: `${filterBy.difficulty}`, $option: 'i' }
    }

    if (filterBy.distance) {
        filterBy.distance = filterBy.distance
    }
    // if (filterBy.distanceMin) {
    //     criteria.distance = filterBy.distanceMax ?
    //         { $gte: filterBy.distanceMin, $lte: filterBy.distanceMax } :
    //         { $gte: filterBy.distanceMin }
    // } else if (filterBy.distanceMax) {
    //     criteria.distance = {
    //         $lte: filterBy.distanceMax
    //     }
    // }

    if (filterBy.days) {
        filterBy.days = filterBy.days
    }
    // if (filterBy.days) {
    //     criteria.distance = filterBy.distanceMax ?
    //         { $gte: filterBy.daysMin, $lte: filterBy.daysMax } :
    //         { $gte: filterBy.daysMin }
    // } else if (filterBy.daysMax) {
    //     criteria.days = {
    //         $lte: filterBy.daysMax
    //     }
    // }

    return criteria;
}
