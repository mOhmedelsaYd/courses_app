const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const controller = require('../controller/userController');
const verifyToken = require('../middleware/verifyToken');
const multer = require('multer');
const appError = require('../utils/appError');

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },

    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        const fileName = `user-${Date.now()}.${ext}`;
        cb(null, fileName);
    }
})

const fileFIlter = (req, file, cb) => {
    const imageType = file.mimetype.split('/')[0];

    if (imageType === 'image') {
        return cb(null, true);
    } else {
        return cb(appError.create('file must be an image', 400), false);
    }

}
const upload = multer({
    storage: diskStorage,
    fileFilter: fileFIlter
});




// get all user

// register

// login 

router.route('/')
    .get(verifyToken, controller.getAllUsers);

router.route('/register')
    .post(upload.single('avatar'), controller.register);

router.route('/login')
    .post(controller.login);
    



module.exports =  router ;