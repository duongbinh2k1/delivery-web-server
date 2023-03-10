const express = require('express');
const userController = require('./user-controller');

const userRoute = express.Router()

userRoute.get('/', userController.getUsers)

module.exports = userRoute;