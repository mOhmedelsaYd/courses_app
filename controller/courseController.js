const { validationResult } = require('express-validator');
const  courses  = require('../models/course.model'); // with database
// let { courses }  = require('../data/courses'); without database

const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utils/appError");

const addAllCourses = asyncWrapper(async (req, res) => {
    const query = req.query;
    const limit = query.limit;
    const page = query.page;
    const skip = (page - 1) * limit;
    const course = await courses.find({}, {"__v": false}).limit(limit).skip(skip);
    res.json({ status: httpStatusText.SUCCESS, data: { courses:course } });
    // res.json(courses); without database
})


const addCourse = asyncWrapper(async (req, res, next) => {
    // const courseId = req.params.courseId;
    // let course = courses.find((course) => course.id == courseId);  without database
    const course = await courses.findById(req.params.courseId);
    if (!course) { 
        const err = appError.create('course not found', 404, httpStatusText.FAIL);
        return next(err);
        // return res.status(404).json({ status: httpStatusText.FAIL, data: { cousre: 'course not found' } });
    }
    res.json({ status: httpStatusText.SUCCESS, data: { course } });


    // try {
    // } catch (err) {
    //     return res.status(400).json({ status: httpStatusText.ERROR, data: null, message: err.message, code: 400}); // obj is invalid
    // }
});

const createCourse =  asyncWrapper(async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {   // handling with express-validator
        const err = appError.create(errors.array(), 400, httpStatusText.FAIL);
        return next(err);
        // return res.status(400).json({ status: httpStatusText.FAIL, data: {errors :  errors.array()}});   
    }

    // if (!req.body.title) {
    //     return res.status(400).json({ error: 'title not found' });
    // }
    // if (!req.body.price) {                                                 handling with traditional way
    //     return res.status(400).json({ error: 'price not found' });
    // }

    // const course = {id : courses.length + 1, ...req.body}
    // courses.push(course) handling without database
    const newCourse = new courses(req.body);
    await newCourse.save();
    res.status(201).json({ status: httpStatusText.SUCCESS, data: {cousre: newCourse}});
})

const updateCourse = asyncWrapper(async (req, res) => {
    
    const courseId = req.params.courseId;
    const updateCourse = await courses.updateOne({ _id : courseId }, { $set: { ...req.body } });
    // let course = courses.find((course) => course.id == courseId);
    res.status(200).json({ status: httpStatusText.SUCCESS, data: {cousre: updateCourse}});
    // try {
    // } catch (err) {
    //     return res.status(400).json({ status: httpStatusText.ERROR, message: err.message });
    // }


})

const deleteCourse = asyncWrapper(async(req, res) => {
    const courseId = req.params.courseId;
    await courses.deleteOne({ _id: courseId });
    res.status(200).json({status: httpStatusText.SUCCESS, data: null});
})


module.exports = {
    addAllCourses,
    addCourse,
    createCourse,
    updateCourse,
    deleteCourse
};