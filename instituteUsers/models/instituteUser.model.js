const mongoose = require('mongoose');

const instituteUserSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  institute: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true }
});

const InstituteUser = mongoose.model('InstituteUser', instituteUserSchema);
module.exports = InstituteUser;
