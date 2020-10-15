const express = require("express");
const router = express.Router();
const {salam} = require('../controllers/userController')

router.get('/', salam)

module.exports = router ;
