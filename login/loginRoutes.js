const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


const {login} = require('./loginControllers');


router.post('/', login );
// router.get('/', loginUser );





module.exports=router;

