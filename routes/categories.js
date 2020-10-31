const express = require('express');

const route = express.Router();

const { createCategory } = require('../controllers/categoryController');

const { requireSignIn, isAuth, isAdmin } = require('../middlewares/auth');

const { userById } = require('../middlewares/user');

route.post('/create/:userId', [requireSignIn, isAuth, isAdmin], createCategory);

route.param('userId', userById);

module.exports = route;
