const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');

//register user
router.post('/register', auth.registerUser);

//login user
router.post('/login', auth.loginUser);

module.exports= router;