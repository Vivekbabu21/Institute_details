const mongoose = require('mongoose');
const express = require('express');
const app = express();
const usersRouter = require('./users/userRoutes');
const instituteUserRouter = require('./instituteUsers/instituteUserRoutes');
const instituteRouter = require('./institute/instituteRoutes');
const departmentRouter = require('./department/departmentRoutes');





const path = require('path');

require('dotenv').config();

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage  });

app.use('/uploads', express.static(path.join(__dirname,'uploads')));




const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/users',usersRouter);
app.use('/instituteUser',instituteUserRouter);
app.use('/institute',instituteRouter);
app.use('/department',departmentRouter);






const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});