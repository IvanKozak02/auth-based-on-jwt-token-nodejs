const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");
const isAuthorized = (req, res, next) => {
    const {authorization: authHeader} = req.headers;
    // CHECK PROVIDING OF JWT TOKEN
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('No token provided', 401);
    }
    const reqToken = authHeader.split(' ')[1];
    // VERIFY TOKEN
    try {
        jwt.verify(reqToken, process.env.JWT_SECRET);
        next();
    } catch (err) {
        throw new CustomAPIError('Not authorized to access this route', 401);
    }
}

module.exports = { isAuthorized };