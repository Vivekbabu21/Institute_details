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
    instituteHeadDetails: {
      type: [{
        headName: { type: String },
        headEmail: { type: String },
        headMobileNumber: { type: Number }
      }],
      validate: {
        validator: function(v) {
          return v && v.some(head => head.headName && head.headEmail && head.headMobileNumber);
        },
        message: 'At least one complete set of institute head details must be provided.'
      }
    },
    instituteAdminDetails:{
      type: [{
        adminName: { type: String },
        adminEmail: { type: String }
      }],
      validate: {
        validator: function(v) {
          return v && v.some(admin => admin.adminName && admin.adminEmail);
        },
        message: 'At least one complete set of institute admin details must be provided.'
      }
    }
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

exports.isEmailUnique = async (email) => {
  const institute = await Institute.findOne({
    $or: [
      { 'instituteHeadDetails.headEmail': email },
      { 'instituteAdminDetails.adminEmail': email }
    ]
  });
  
  return !institute;
};

exports.isPOCEmailUnique = async (email) => {
  const institute = await Institute.findOne({pocEmail:email});
  return !institute;
};

exports.uniqueWebsiteUrl = async (url) => {
  const institute = await Institute.findOne({websiteUrl:url});
  return !institute;
};

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
        instituteHeadDetails: Joi.array().items(
          Joi.object({
            headName: Joi.string().min(3),
            headEmail: Joi.string().email(),
            headMobileNumber: Joi.number()
          })).min(1).custom((value, helpers) => {
            const hasCompleteHeadDetails = value.some(head => head.headName && head.headEmail && head.headMobileNumber);
            if (!hasCompleteHeadDetails) {
              return helpers.message('At least one complete set of institute head details must be provided.');
            }
            return value;
          }),
        instituteAdminDetails: Joi.array().items(
          Joi.object({
            adminName: Joi.string().min(3),
            adminEmail: Joi.string().email()
          })).min(1).custom((value, helpers) => {
            const hasCompleteAdminDetails = value.some(admin => admin.adminName && admin.adminEmail);
            if (!hasCompleteAdminDetails) {
              return helpers.message('At least one complete set of institute admin details must be provided.');
            }
            return value;
          })
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