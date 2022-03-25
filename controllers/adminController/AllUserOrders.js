const Order = require('../../models/OrderModel')

module.exports.getAllUserOrders = async (req, res) => {

    try {
        const allOrders = await Order.find().sort({ updatedAt: -1 });
        if (!allOrders) {
            return res.statud(204).json({
                msg: 'Order not received yet...'
            })
        }
        return res.status(200).json({
            allOrders
        })
    } catch (error) {
        
        console.log(error.stack);
    }

}

module.exports.getSingleUserOrderDetail = async (req, res) => {
    let id = req.params.id;
    // console.log(id);
    try {
        const order = await Order.findById(id)
        if (!order) {
            return res.status(304).json({
                error: 'Order not found!'
            })
        }

        return res.status(200).json({
            order
        })

    } catch (error) {
        console.log(error.stack);
    }
}

module.exports.updateOrderStatus = async (req, res) => {
    // console.log(req.body);
    try {
        const order = await Order.findById(req.body._id);
        if (!order) {
            return res.status(204).json({
                msg: 'Order does not exist'
            })
        }

        try {
            const updatedOrder = await Order.findByIdAndUpdate(req.body._id, req.body, { new: true })
            return res.status(200).json({
                msg: "Order Status Updated Successfully!!",
                updatedOrder
            })
        } catch (error) {
            // console.log(error);
            return res.status(400).json({
                error: error
            })
        }

    } catch (error) {
        // console.log(error)
        return res.status(400).json({
            error: error
        })
    }
}

