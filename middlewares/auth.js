const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
    // console.log(req.headers.authorization.substr(7));
    const token = req.body.token || req.query.token || req.headers.authorization.substr(7);
    // console.log(token);
    if (!token) {
        return res.status(403).json({
            error: [{msg: "A token is required for authentication"}]
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded.user;
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            error: [{msg: "Invalid Token code"}]
        })
    }
    return next();
};

module.exports = verifyToken;