const User = require('../../models/UserModel');


module.exports.getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) {
        return res.status(404).json({
            error: 'Users not Found'
        })
    }
    return res.status(200).json({
        users
    })
}


module.exports.deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                error: 'User not found...please Enter valid Input'
            })
        }
        const deletedUser = await User.findByIdAndRemove(id);
        return res.status(200).json({
            deletedUser,
            msg: 'User deleted Successfully!!'
        })
    } catch (error) {

    }
}

module.exports.updateUserRole = async (req, res) => {
    try {
        // const user = user
        // console.log(user);
        // console.log(req.body);
        const isUser = await User.findById(req.params.id);
        if (!isUser) {
            return res.status(500).json({
                error: 'User Not found...'
            })
        }

        const newUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        return res.status(201).json({
            msg:'User Role updated Successfully!!'
        })
    } catch (error) {
        
        console.log(error + '76');
    }
}