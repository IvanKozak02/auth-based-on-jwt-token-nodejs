const express = require('express');
const {register, login, dashboard} = require("../controllers/main");
const {isAuthorized} = require("../middleware/auth");

const router = express.Router();


// router.post('/register', register);
router.post('/login', login);
router.get('/dashboard', isAuthorized, dashboard);



module.exports = {router};