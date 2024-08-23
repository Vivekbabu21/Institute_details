const express = require('express');
const router = express.Router();
const { getInstitutes,addInstitute,getInstituteById,editInstituteById} = require('./controllers/institute.controller');
const multer = require('multer');
const path = require('path');

// const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage  });

router.use('/uploads', express.static(path.join(__dirname,'uploads')));

router.get('/', getInstitutes);
router.post('/', upload.single('image'), addInstitute);
router.get('/:id', getInstituteById);
router.put('/:id',upload.single('image'), editInstituteById);





module.exports = router;
