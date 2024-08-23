const express = require('express');
const router = express.Router();


const {addUser} = require('./controllers/users.controller');


router.post('/',addUser);





module.exports=router;

