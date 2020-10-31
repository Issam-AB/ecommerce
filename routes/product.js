const express = require('express');

const route = express.Router();

const { createProduct } = require('../controllers/productController');

const { requireSignIn, isAuth, isAdmin } = require('../middlewares/auth');

const { userById } = require('../middlewares/user');

route.post('/create/:userId', [requireSignIn, isAuth, isAdmin], createProduct);

route.param('userId', userById);

module.exports = route;
