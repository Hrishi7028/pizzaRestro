const stripe = require('stripe')(process.env.STRIPE__KEY);
const { v4: uuidv4 } = require('uuid');
const Order = require('../models/OrderModel')


module.exports.setOrder = async (req, res) => {
    // console.log(req.body);
    const { amount, token, currUser, cartItems, totalQuantity } = req.body
    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,

        })
        const paymentIntents = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'INR',
            payment_method_types: ['card'],

        }, {
            idempotencyKey: uuidv4()
        })
        // console.log(paymentIntents);
        if (!paymentIntents) {
            return res.status(300).json({
                error: 'Something went wrong in payment process'
            })
        }

        const newOrder = new Order({
            name: currUser.Fname,
            email: currUser.email,
            shippinAddress: currUser.address,
            OrderAmount: amount,
            userId: currUser._id,
            cartItems: cartItems,
            mobile:currUser.mobile,
            totalQuantity: totalQuantity,
            transationId: paymentIntents.id,
            mobile:currUser.mobile
        })
        await newOrder.save();
        
        return res.status(200).json({
            msg: 'Ordered Successfull...'
        })

    } catch (error) {
        console.log("error: 50");
        console.log(error.message);
    }

}

module.exports.getUserOrder = async (req, res) => {
    let id = req.params.id;
    const allData = await Order.find({ userId: id }).sort({ updatedAt: -1 })
    if (!allData) {
        return res.status(400).json({
            error: 'User Does not Exist'
        })
    }
    return res.status(200).json({
        allData
    })
}




