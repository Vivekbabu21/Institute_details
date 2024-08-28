const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  institute: { type: mongoose.Schema.Types.ObjectId, ref: 'Institute', required: true }
});

const AdminUser = mongoose.model('AdminUser', adminUserSchema);


exports.addAdminUser = (data) => {
    const adminUser = new AdminUser(data);
    return adminUser.save();        
};