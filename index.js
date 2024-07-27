require('dotenv').config({ path: 'example.env'});;
const express = require('express');
const app = express();
const cors = require('cors'); // cors to make any orgin can connect 
const {body, validationResult } = require('express-validator');
const Router = require('./Router/courseRouter');
const userRouter = require('./Router/userRouter');
const httpStatusText = require("./utils/httpStatusText");

const path = require('path');


// const appError = require("../utils/appError");

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('mongoose server started');
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());


app.use('/courses', Router);
app.use('/users', userRouter);

// global middlware for not found router
app.all("*", (req, res, next) => {
    res.json({ status: httpStatusText.ERROR, message: "resource is not available"});
})

// global error handler 
app.use((err, req, res, next) => {
    res.status(err.statuscode || 500).json({status: err.statusText || httpStatusText.ERROR, message:err.message, code: err.statuscode || 500,data: null });
})

console.log("i love you zo3gol");

app.listen(process.env.PORT, () => {
    console.log('listening at port : 5000');
})  
