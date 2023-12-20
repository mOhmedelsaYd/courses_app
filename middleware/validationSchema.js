const { body } = require('express-validator');
const validationSchema = () => {
    return [
        body('title')
            .notEmpty()
            .withMessage("title is required") // join two api to one route we can do it down too
            .isLength({ min: 2 })
            .withMessage("title is at least 2"),
        body('price')
            .notEmpty()
            .withMessage("price is required")
    ]
};

module.exports = { validationSchema };