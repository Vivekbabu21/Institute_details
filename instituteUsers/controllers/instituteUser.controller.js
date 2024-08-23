const InstituteUser = require('../models/instituteUser.model');

const addInstituteUser = async (req, res) => {
    try {
        const { userId, instituteId } = req.body;
        
        const instituteUser = new InstituteUser({
            user: userId,
            institute: instituteId
        });

        await instituteUser.save();
        res.status(201).send(instituteUser);
    } catch (ex) {
        console.log(ex);
        res.status(500).send({ message: 'An error occurred while adding the user to the institute.' });
    }
};

module.exports = {
    addInstituteUser
};
