const Pizza = require('../models/pizzaModel')

// get all pizza details
module.exports.getAllPizza = async (req, res) => {
    try {
        const pizza = await Pizza.find()
        return res.status(200).json({
            msg: 'All pizza List is here...',
            pizza,
        })
    } catch (error) {
        // console.log(error)
        return res.status(400).json({
            error: error
        })
    }
}

//getting single pizza details
module.exports.getSinglePizza = async (req, res) => {
    try {
        const pizza = await Pizza.findOne({ _id: req.params.id });
        if (!pizza) {
            return res.status(400).json({
                error: "Product does not exist."
            })
        }
        return res.status(200).json({
            msg: 'Success',
            pizza
        })
    } catch (error) {
        // console.log(error)
        return res.status(400).json({
            error: error
        })
    }

}

// insert a new Pizza
module.exports.createPizza = async (req, res) => {

    try {
        // console.log("line 45 ->");
        // console.log(req.body);
        const pizza = await Pizza.create(req.body);
        return res.status(201).json({
            msg: "Pizza has added successfully!!",
            pizza
        })
    } catch (error) {
        // console.log(error)
        return res.status(400).json({
            error: error
        })
    }
}

// delete pizza
module.exports.deletePizza = async (req, res) => {
    try {
        const pizaa = await Pizza.findOne({ _id: req.params.id });
        if (!pizaa) {
            return res.status(400).json({
                error: "Product does not exist."
            })
        }

        const deletePizza = await Pizza.findByIdAndDelete(req.params.id);
        // console.log(deletePizza);
        return res.status(200).json({
            msg: "Product deleted Successfully!!"
        })

    } catch (error) {
        // console.log(error)
        return res.status(400).json({
            error: error
        })
    }
}

// updating single pizza
module.exports.updatePizza = async (req, res) => {
    try {
        const pizaa = await Pizza.findOne({ _id: req.params.id });
        if (!pizaa) {
            return res.status(400).json({
                error: "Product does not exist."
            })
        }

        const updatedPizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.status(200).json({
            msg: "Product Updated Successfully!!",
            updatedPizza
        })

    } catch (error) {
        // console.log(error)
        return res.status(400).json({
            error: error
        })
    }
}
