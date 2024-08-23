const mongoose = require('mongoose');
const Joi = require('joi');


const departmentSchema = new mongoose.Schema({
  departmentName: { type: String, required: true }, 
  instituteName: { type: String, required: true }, 
  departmentHead: { type: String, required: true },
  phoneNumber: { type: String }, 
  emailId: { type: String }, 
  createdDate: { type: Date, default: Date.now} 
});

const Department = mongoose.model('Department', departmentSchema);


exports.addDepartment = (data) => {
    const department = new Department(data);
    return department.save();        
};


exports.getDepartments = ()=>{
return Department.find();
}

exports.getDepartmentById = (department_id)=>{
return Department.findById(department_id);
}

exports.editDepartmentById = (department_id,data)=>{
return Department.findByIdAndUpdate(department_id,{ $set: data },{new:true});
}


exports.validateDepartment = (department)=> {
    const schema = Joi.object({
        departmentName: Joi.string().required(),
        instituteName: Joi.string().required(),
        departmentHead: Joi.string().required(),
        phoneNumber: Joi.string(),
        emailId: Joi.string().email(),
        createdDate: Joi.date().default(Date.now)
      });

    return schema.validate(department);
  }

  exports.validateEditDepartment = (department)=> {
    const schema = Joi.object({
        departmentName: Joi.string(),
        instituteName: Joi.string(),
        departmentHead: Joi.string(),
        phoneNumber: Joi.string(),
        emailId: Joi.string().email(),
        createdDate: Joi.date().default(Date.now)
      });

    return schema.validate(department);
  }

