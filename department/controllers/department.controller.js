const departmentModel = require('../models/department.model');

const getDepartments = async(req, res) => {
    try {
        const departments = await departmentModel.getDepartments();
        res.json(departments);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'An error occurred while retrieving departments.' });
    }
};

const addDepartment = async(req, res) => {
    try {
        const {error} =  departmentModel.validateDepartment(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const department = await departmentModel.addDepartment(req.body);
        res.status(200).send(department);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'An error occurred while adding the department.' });
    }
};

const getDepartmentById = async(req, res) => {
    try {
        const department = await departmentModel.getDepartmentById(req.params.id);
        res.json(department);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'An error occurred while retrieving departments.' });
    }
};

const editDepartmentById = async(req, res) => {
    try {
        const {error} =  departmentModel.validateEditDepartment(req.body);
        if (error) return res.status(400).send(error.details[0].message);


        const { id } = req.params;
        const updateData = req.body;
        const department = await departmentModel.editDepartmentById(id,updateData);
        if (!department) {
            return res.status(404).send({ message: 'Department not found.' });
        }
        res.status(200).send(department);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'An error occurred while adding the department.' });
    }
};

module.exports = { getDepartments,addDepartment,getDepartmentById,editDepartmentById}