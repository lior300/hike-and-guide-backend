const orderService = require('./order.service')
const logger = require('../../services/logger.service')

async function getOrders(req, res) {
    const orders = await orderService.query(req.query)
    res.send(orders) 
}

async function getOrder(req, res) {
    const order = await orderService.getById(req.params.id)
    res.send(order)
}

async function deleteOrder(req, res) {
    await orderService.remove(req.params.id)
    res.end()
}

async function updateOrder(req, res) {
    const order = req.body;
    await orderService.update(order)
    res.send(order)
}

async function addOrder(order) {
    const collection = await dbService.getCollection('order');
    review.byUser = req.session.user;
    try {
        order = await orderService.add(order);
        await collection.insertOne(orderToSave);
        return orderToSave;
    } catch (err) {
        console.log(`ERROR: cannot insert order`);
        throw err;
    }
}

module.exports = {
    addOrder,
    getOrders,
    deleteOrder,
    updateOrder,
    getOrder
}
