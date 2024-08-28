const userModel = require('../models/users.model');
const bcrypt = require('bcrypt');
require('dotenv').config();



const addUser = async(req, res) => {
    try {
        const { error } = userModel.validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        
        const emailValid = await userModel.isEmailValid(req.body.email);
        if (emailValid) return res.status(400).send('User already registered');

        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        const user = await userModel.addUser(req.body);

        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'An error occurred while adding the user.' });
    }
};

module.exports={addUser}