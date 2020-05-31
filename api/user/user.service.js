const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const logger = require('../../services/logger.service')
const COLLECTION_NAME = 'user';


module.exports = {
    getByEmail,
    query,
    getById,
    remove,
    update,
    add,
    addTrailToGuide
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        const users = await collection.find(criteria).toArray();
        users.forEach(user => delete user.password);
        return users
    } catch (err) {
        console.log('ERROR: cannot find users')
        throw err;
    }
}

async function getById(userId) {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        const user = await collection.findOne({ "_id": ObjectId(userId) })
        delete user.password
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${userId}`)
        throw err;
    }
}

async function getByEmail(email) {
    logger.debug(`user.service.getByEmail - Looking for user: ${email}`)
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ email })
        if (user) {
            logger.debug(`user.service.getByEmail - user found: ${email}`)
        } else logger.info(`user.service.getByEmail - user not found: ${email}`)
        return user
    } catch (err) {
        logger.error(`user.service.getByEmail got error. username: ${email}`)
        console.log(`ERROR: while finding user ${email}`)
        throw err;
    }
}

async function remove(userId) {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        await collection.deleteOne({ "_id": ObjectId(userId) })
    } catch (err) {
        console.log(`ERROR: cannot remove user ${userId}`)
        throw err;
    }
}

async function update(user) {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    user._id = ObjectId(user._id);
    if (!user.password) {
        const prevUser = getById(user._id)
        user.password = prevUser.password
    }
    try {
        await collection.replaceOne({ "_id": user._id }, { $set: user })
        return user
    } catch (err) {
        console.log(`ERROR: cannot update user ${user._id}`)
        throw err;
    }
}

async function add(user) {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        await collection.insertOne(user);
        return user;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

async function addTrailToGuide(curd) {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        await collection.update({ '_id': ObjectId(curd.userId)}, { $push: { 'trails': curd.trail } });
        return curd;
    } catch (err) {
        console.log(`ERROR: cannot add trail`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.isAdmin) {
        criteria.isAdmin = filterBy.isAdmin
    }
    return criteria;
}
