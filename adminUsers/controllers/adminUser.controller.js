const AdminUserModel = require('../models/adminUser.model');



const addAdminUser = async(req, res) => {
    try {
        const adminUser = await AdminUserModel.addAdminUser(req.body);
        res.status(200).send(adminUser);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'An error occurred while adding the user.' });
    }
};

module.exports = {
    addAdminUser
};
