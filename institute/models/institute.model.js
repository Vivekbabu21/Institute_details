const mongoose = require('mongoose');
const Joi = require('joi');


const instituteSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    yearEstablished: { type: Number, required: true },
    websiteUrl: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pin: { type: Number, required: true },
    logo: { type: String, required: true },
    pocName: { type: String },
    pocNumber: { type: String },
    pocEmail: { type: String },
    instituteHeadDetails: [
      {
        headName: { type: String, required: true },
        headEmail: { type: String, required: true },
        headMobileNumber: { type: Number, required: true }
      }
    ],
    instituteAdminDetails: [
      {
        adminName: { type: String, required: true },
        adminEmail: { type: String, required: true }
      }
    ]
  });

const Institute = mongoose.model('Institute', instituteSchema);

exports.addInstitute = (data) => {
            const institute = new Institute(data);
            return institute.save();        
    };
    

exports.getInstitutes = ()=>{
    return Institute.find();
}

exports.getInstituteById = (institute_id)=>{
    return Institute.findById(institute_id);
}

exports.editInstituteById = (institute_id,data)=>{
    return Institute.findByIdAndUpdate(institute_id,{ $set: data },{new:true});
}

exports.validateInstitute = (institute)=> {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        type: Joi.string().required(),
        yearEstablished: Joi.number().integer().required(),
        websiteUrl: Joi.string().uri().required(),
        address: Joi.string().min(5).required(),
        city: Joi.string().min(2).required(),
        state: Joi.string().min(2).required(),
        pin: Joi.number().integer().required(),
        logo: Joi.string().required(),
        pocName: Joi.string().min(3).required(),
        pocNumber: Joi.string().required(),
        pocEmail: Joi.string().email().required(),
        instituteHeadDetails: Joi.array().items(Joi.object({
          headName: Joi.string().min(3).required(),
          headEmail: Joi.string().email().required(),
          headMobileNumber: Joi.number().integer().required()
        })),
        instituteAdminDetails: Joi.array().items(Joi.object({
          adminName: Joi.string().min(3).required(),
          adminEmail: Joi.string().email().required()
        }))
      });
  
    return schema.validate(institute);
  }

  exports.validateEditInstitute = (institute)=> {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100),
        type: Joi.string(),
        yearEstablished: Joi.number().integer(),
        websiteUrl: Joi.string().uri(),
        address: Joi.string().min(5),
        city: Joi.string().min(2),
        state: Joi.string().min(2),
        pin: Joi.number().integer(),
        logo: Joi.string(),
        pocName: Joi.string().min(3),
        pocNumber: Joi.string(),
        pocEmail: Joi.string().email(),
        instituteHeadDetails: Joi.array().items(Joi.object({
          headName: Joi.string().min(3),
          headEmail: Joi.string().email(),
          headMobileNumber: Joi.number().integer()
        })),
        instituteAdminDetails: Joi.array().items(Joi.object({
          adminName: Joi.string().min(3),
          adminEmail: Joi.string().email()
        }))
      });
  
    return schema.validate(institute);
  }