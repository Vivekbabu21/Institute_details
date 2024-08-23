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