const express = require('express');
const router = express.Router();
const { addInstituteUser } = require('./controllers/instituteUser.controller');

router.post('/', addInstituteUser);

module.exports = router;
