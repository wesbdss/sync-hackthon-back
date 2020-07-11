const express = require('express')
const authController = require('./controllers/auth-controller')
const userController = require('./controllers/user-controller')

const route = express()

route.get('/login', authController.login)
route.post('/register', authController.register)

route.get('/users', userController.index)
route.get('/users/:id', userController.show)

module.exports = route
