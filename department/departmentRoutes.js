const express = require('express');
const router = express.Router();
const { getDepartments,addDepartment,getDepartmentById,editDepartmentById} = require('./controllers/department.controller');


router.get('/', getDepartments);
router.post('/', addDepartment);
router.get('/:id', getDepartmentById);
router.put('/:id',editDepartmentById);





module.exports = router;
