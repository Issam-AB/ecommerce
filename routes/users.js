const express = require('express');
const  {salam, signup, signin} = require('../controllers/userController');
const { userSignUpValidator } = require('../middlewares/userValidator')
const router = express.Router();



router.get('/', salam);

router.post('/signup', userSignUpValidator, signup);

router.post('/signin', signin);


module.exports =  router ;
