const express = require('express');
const route = express.Router();
const { getOneUser } = require('../controllers/userController');
const { userById } = require('../middlewares/user');
const { requireSignIn, isAuth, isAdmin } = require('../middlewares/auth');


route.get('/profile/:userId', requireSignIn, isAuth, getOneUser);

route.param('userId', userById);


module.exports = route;