const User = require('../models/users.model');
const addUser = async (req, res) => {
    try {
        let user = new User({ 
            username: req.body.username,  
            email: req.body.email,
            password: req.body.password,
            role: req.body.role 
        });

        await user.save();
        res.send(user);
    } catch (ex) {
        console.log(ex);
        res.status(500).send({ message: 'An error occurred while adding the user.' });
    }
};

module.exports={addUser}