
const asyncWrapper = require("../middleware/asyncWrapper");
const users = require('../models/userModel');
const httpStatusText = require("../utils/httpStatusText");
const appError = require('../utils/appError');
const bcrypt = require('bcrypt');
const generateJwt = require('../utils/generateJwt');
const getAllUsers = asyncWrapper(async (req, res) => {
    const query = req.query;
    const limit = query.limit;
    const page = query.page;
    const skip = (page - 1) * limit;
    const user = await users.find({}, {"__v": false, "password": false}).limit(limit).skip(skip);
    res.json({ status: httpStatusText.SUCCESS, data: { users:user } });
    // res.json(courses); without database
})

const register = asyncWrapper(async(req, res, next) => {
    
    const olduser = await users.findOne({ email: req.body.email });
    if (olduser) {
        const err = appError.create('user already exists', 400, httpStatusText.FAIL);
        return next(err);
    }

    const hashpassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashpassword;
    req.body.avatar = req.file.filename;
    const newUser = new users(req.body);

    // generate token 
    const token = await generateJwt({ email: newUser.email, id: newUser._id, role: newUser.role }); 
    /// jwt consist of  data and secret key we create secret key from  =>  require('crypto').randomBytes(32).toString('hex')
    newUser.token = token;

    await newUser.save();
    res.status(201).json({ status: httpStatusText.SUCCESS, data: {user: newUser}});
})

const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        const err = appError.create('email and password are required', 400, httpStatusText.FAIL);
        return next(err);
    }

    const user = await users.findOne({ email: email });
    if (!user) {
        const err = appError.create('email or password is wrong', 400, httpStatusText.FAIL);
        return next(err);
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (matchPassword) {
        // login successfully

        const token = await generateJwt({ email: user.email, id: user._id, role: user.role }); 
        res.json({ status: httpStatusText.SUCCESS, data: { token } });
    } else {
        const err = appError.create('email or password is wrong', 400, httpStatusText.FAIL);
        return next(err);
    }



});


module.exports = {
    getAllUsers,
    register,
    login
}