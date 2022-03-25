const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile:{
        type:Number,
        required:true
    },
    shippinAddress: {
        type:String,
        required:true
    },
    cartItems: {
        type: [{
            name: {
                type: String
            },
            pizzaType: {
                type: String
            },
            quantity: {
                type: Number
            },
            price: {
                type: Number
            }
        }]
    },
    OrderAmount: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    totalQuantity: {
        type: Number,
        required: true
    },
    isDelived: {
        type: String,
        required: true,
        default: 'Ordered'
    },
    transationId: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)