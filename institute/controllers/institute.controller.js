const instituteModel = require('../models/institute.model');



const getInstitutes = async(req, res) => {
    try {
        const institutes = await instituteModel.getInstitutes();
        res.json(institutes);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'An error occurred while retrieving institutes.' });
    }
};

const addInstitute = async(req, res) => {
    try {
        const addData = req.body;

        if (req.file) {
            addData.logo = req.file.path;
        }
        const {error} =  instituteModel.validateInstitute(addData);
        if (error) return res.status(400).send(error.details[0].message);

        if (addData.websiteUrl) {
            const uniqueUrl = await instituteModel.uniqueWebsiteUrl(addData.websiteUrl);
            if (!uniqueUrl) {
                return res.status(400).send(`WebsiteUrl ${addData.websiteUrl} is already in use.`);
            }
        }

        if (addData.pocEmail) {
            const pocEmailUnique = await instituteModel.isPOCEmailUnique(addData.pocEmail);
            if (!pocEmailUnique) {
                return res.status(400).send(`POC Email ${addData.pocEmail} is already in use.`);
            }
        }

        if (addData.instituteHeadDetails) {
            for (const head of addData.instituteHeadDetails) {
                const emailUnique = await instituteModel.isEmailUnique(head.headEmail);
                if (!emailUnique) {
                    return res.status(400).send(`Email ${head.headEmail} is already in use`);
                }
            }
        }
        if (addData.instituteAdminDetails) {
            for (const admin of addData.instituteAdminDetails) {
                const emailUnique = await instituteModel.isEmailUnique(admin.adminEmail);
                if (!emailUnique) {
                    return res.status(400).send(`Email ${admin.adminEmail} is already in use.`);
                }
            }
        }


        const institute = await instituteModel.addInstitute(req.body);
        res.status(201).send(institute);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'An error occurred while adding the institute.' });
    }
};

const getInstituteById = async(req, res) => {
    try {
        const institute = await instituteModel.getInstituteById(req.params.id);
        res.json(institute);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'An error occurred while retrieving institutes.' });
    }
};

const editInstituteById = async(req, res) => {
    try {
       
        if (req.file) {
            req.body.logo = req.file.path; 
        }
        const {error} =  instituteModel.validateEditInstitute(req.body);
        if (error) return res.status(400).send(error.details[0].message);


        const { id } = req.params;
        const updateData = req.body;

        if (updateData.websiteUrl) {
            const uniqueUrl = await instituteModel.uniqueWebsiteUrl(updateData.websiteUrl);
            if (!uniqueUrl) {
                return res.status(400).send(`WebsiteUrl ${updateData.websiteUrl} is already in use.`);
            }
        }

        if (updateData.pocEmail) {
            const pocEmailUnique = await instituteModel.isPOCEmailUnique(updateData.pocEmail);
            if (!pocEmailUnique) {
                return res.status(400).send(`POC Email ${updateData.pocEmail} is already in use.`);
            }
        }

        if (updateData.instituteHeadDetails) {
            for (const head of updateData.instituteHeadDetails) {
                const emailUnique = await instituteModel.isEmailUnique(head.headEmail);
                if (!emailUnique) {
                    return res.status(400).send(`Email ${head.headEmail} is already in use`);
                }
            }
        }
        if (updateData.instituteAdminDetails) {
            for (const admin of updateData.instituteAdminDetails) {
                const emailUnique = await instituteModel.isEmailUnique(admin.adminEmail);
                if (!emailUnique) {
                    return res.status(400).send(`Email ${admin.adminEmail} is already in use.`);
                }
            }
        }
        const institute = await instituteModel.editInstituteById(id,updateData);
        if (!institute) {
            return res.status(404).send({ message: 'Institute not found.' });
        }
        res.status(200).send(institute);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'An error occurred while adding the institute.' });
    }
};


module.exports = { getInstitutes,addInstitute,getInstituteById,editInstituteById}