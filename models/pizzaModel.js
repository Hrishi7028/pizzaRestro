const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    varients: {
        type: [],
        default: ['small', 'medium', 'large']
    },
    prices: {
        type: [
            {
                small: {
                    type: Number
                },
                medium: {
                    type: Number
                },
                large: {
                    type: Number
                }
            }
        ]
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model('Pizza', pizzaSchema);