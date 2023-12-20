const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const controller = require('../controller/courseController');
const { validationSchema } = require('../middleware/validationSchema');
const roleUser = require('../utils/role');
const allowedTo = require('../middleware/allowedTo');

// get all courses
router.route('/')
    .get(controller.addAllCourses)
    .post(verifyToken,  allowedTo(roleUser.MANGER), validationSchema(), controller.createCourse);
    

// get single courses
router.get('/:courseId', verifyToken,  allowedTo(roleUser.ADMIN, roleUser.MANGER), controller.addCourse);



// update a new course

router.patch('/:courseId', verifyToken,  allowedTo(roleUser.ADMIN, roleUser.MANGER), controller.updateCourse);

// delete a course
router.delete('/:courseId',verifyToken,  allowedTo(roleUser.ADMIN, roleUser.MANGER), controller.deleteCourse);

module.exports =  router ;