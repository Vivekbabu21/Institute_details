const express = require('express');
const router = express.Router();
const { addAdminUser } = require('./controllers/adminUser.controller');

router.post('/', addAdminUser);

module.exports = router;
