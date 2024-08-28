const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config();

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true }
});

const jwtSecret = process.env.JWT_SECRET;

userSchema.methods.generateAuthToken =function(){
  try{
    const token = jwt.sign({_id:this._id},jwtSecret);
    return token;
  } catch (err) {
    console.error('Error generating token:', err);
    throw new Error('Token generation failed');
}
}

const User = mongoose.model('User', userSchema);



exports.addUser = (data) => {
    const user = new User(data);
    return user.save();        
};

exports.isEmailValid = async(valiEmail) => {
  const user = await User.findOne({email:valiEmail});
  return user;       
};

exports.validateUser = (user)=> {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().required()
    });

  return schema.validate(user);
}

exports.User = User;


