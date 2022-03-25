const User = require('../models/UserModel');
const Token = require('../models/resetTokensModel')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const sendEmail = require('../utils/sendEmail');
const createToekn = (user) => {
    return (jwt.sign({ user }, process.env.TOKEN_KEY, { expiresIn: "7d" }))
}

module.exports.registerValidation = [
    body('email').not().isEmpty().isEmail().withMessage('Email shoud be entered'),
    body('Fname').not().isEmpty().isLength({ min: 3 }).withMessage('First Name shoud be entered'),
    body('Lname').not().isEmpty().isLength({ min: 3 }).withMessage('Last Name shoud be entered'),
    body('password').isLength({ min: 5 }).withMessage('Password shoud be entered'),
    body('mobile').not().isEmpty().isLength({ min: 10 }).withMessage('Mobile Number shoud be entered')
]


module.exports.register = async (req, res) => {

    try {
        const errors = validationResult(req, res);
        if (!errors.isEmpty()) {
            return res.status(500).json({
                error: errors.array()
            });
        }

        const isUserExist = await User.findOne({ email: req.body.email })
        // error if user already exists
        if (isUserExist) {
            return res.status(404).json({
                error: [{ msg: 'User Already Register' }]
            })
        }

        const hashPassword = async () => {
            const hash = await bcrypt.hash(req.body.password, 10)
            req.body.password = hash
            const user = await User.create(req.body);

            const token = createToekn(user);

            user.token = token;
            // console.log(user);
            return res.status(201).json({
                msg: "User Created Successfully!!",
                token
            })
        }
        hashPassword();
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            err: error
        })
    }
}

module.exports.loginValidation = [
    body('email').not().isEmpty().isEmail().withMessage('Email shoud be entered'),
    body('password').isLength({ min: 5 }).withMessage('Password shoud be entered')
]


module.exports.login = async (req, res) => {

    try {
        const errors = validationResult(req, res);
        if (!errors.isEmpty()) {
            return res.status(500).json({
                error: errors.array()
            });
        }

        isUserExist = await User.findOne({ email: req.body.email });
        if (!isUserExist) {
            return res.status(404).json({
                error: [{ msg: 'User Does not Exist' }]
            })
        }

        const hashPassword = async () => {
            const isMatched = await bcrypt.compare(req.body.password, isUserExist.password)
            if (!isMatched) {
                return res.status(501).json({
                    error: [{ msg: 'Password does not match!' }]
                })
            }


            token = createToekn(isUserExist)

            return res.status(200).json({
                msg: "Logged in Successfully!!",
                token
            })
        }

        hashPassword()
    } catch (error) {
        console.log(error + "line no 87");
    }
}

module.exports.resetLink = async (req, res) => {
    try {
        const isUser = await User.findOne({ email: req.body.email })
        if (!isUser) {
            return res.status(404).json({
                error: [{ msg: 'User Not Found with respect to this email Id' }]
            })
        }

        let token = await Token.findOne({ userId: isUser._id });
        if (!token) {
            token = await new Token({
                userId: isUser._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        const link = `${process.env.BASE_URL}/password-reset/set_new/pass/${isUser._id}/${token.token}`;
        await sendEmail(isUser.email, "Password reset", isUser, link);

        return res.status(200).json({
            msg: [{ msg: 'Link has sent to your email Id Successfully...' }]
        })
    } catch (error) {
        console.log("line 133 userController.js");
        console.log(error);
    }

}

module.exports.passwordResetValidation = [
    body('password').isLength({ min: 5 }).withMessage('Password shoud be more than 5 character')
]


module.exports.setNewPassword = async (req, res) => {
    const { id, token } = req.params
    const { password } = req.body
    const errors = validationResult(req, res);
    if (!errors.isEmpty()) {
        return res.status(500).json({
            error: errors.array()
        });
    }
    try {
        const user = await User.findById(id);
        const getToken = await Token.findOne({
            userId: user._id,
            token: token
        })
        if (!user || !getToken) {
            return res.status(400).json({
                error: [{ msg: 'Link is Expired get Another link' }]
            })
        }

        const hashPassword = async () => {
            const hashedPassword = await bcrypt.hash(password, 10)
            user.password = hashedPassword;
            const updateUser = { ...user, password: hashedPassword }
            console.log(updateUser);
            const nuser = await User.findByIdAndUpdate(user._id, updateUser, { new: true })
            console.log(nuser);
            await getToken.delete()
            return res.status(201).json({
                msg: [{ msg: 'Password reset Successfully!!' }]
            })
        }
        hashPassword();

    } catch (error) {
        console.log('line 159');
        console.log(error);
    }
}
