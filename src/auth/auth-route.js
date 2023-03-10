const express = require('express');
const authController = require('./auth-controller')

const authRoute = express.Router()

authRoute.post("/register", authController.register);
authRoute.post("/login", authController.login);
authRoute.get("/refresh", authController.refresh);

module.exports = authRoute