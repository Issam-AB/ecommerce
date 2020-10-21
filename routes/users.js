const express = require('express');
const  {salam, signup} = require('../controllers/userController');
const router = express.Router();



router.get('/', salam);

router.post('/signup', signup);


module.exports =  router ;
