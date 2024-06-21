const CustomAPIError = require("../errors/custom-error");
const jwt = require('jsonwebtoken');
const register = async (req, res) => {

}


const login = async (req, res) => {
    const {username, password} = req.body;

    // CHECK USER CREDENTIALS
    if (!username || !password) {
        throw new CustomAPIError('Bad username or password credentials.', 400)
    }

    // CHECK PROVIDING OF JWT TOKEN
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('No token provided', 401);
    }
    const reqToken = authHeader.split(' ')[1];

    // VERIFY TOKEN
    try {
        const decoded = jwt.verify(reqToken, process.env.JWT_SECRET);
        console.log(decoded);
    } catch (err) {
        throw new CustomAPIError('Not authorized to access this route', 401);
    }

    // GENERATE JWT TOKEN
    const id = new Date().getDate();
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '1d'});
    return res.status(200).json({msg: 'User authorized!', token});
}

const dashboard = (req, res) => {
    return res.status(200).json({luckyNumber: Math.floor(Math.random() * 100)});
}

module.exports = {register, login, dashboard}

