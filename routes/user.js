const express = require('express');
const route = express.Router();
const { getOneUser, updateOneUser } = require('../controllers/userController');
const { userById } = require('../middlewares/user');
const { requireSignIn, isAuth, isAdmin } = require('../middlewares/auth');

route.get('/:userId', requireSignIn, isAuth, getOneUser);
route.post('/:userId', requireSignIn, requireSignIn, updateOneUser);

route.param('userId', userById);

module.exports = route;
