const { body, validationResult } = require('express-validator');

/**
 * Registration Validation Rules
 */
const registerValidationRules = () => {

    return [
        body('username').not().isEmpty().withMessage("User name is required"),
        body('email').isEmail().withMessage("Please enter valid email"),
        body('password').isLength({min: 8}).withMessage("Password must be at least 8 characters long")
    ];
};

/**
 * Log in Validation Ruels
 */
const loginValidationRules = () => {

    return [
        body('email').isEmail().normalizeEmail().withMessage("Please enter valid email"),
        body('password').not().isEmpty().withMessage("Enter a valid password"),
    ];
};

/**
 * Profile Validation Rules
 */
const newPorfileRules = () => {

    return [
        body('title').not().isEmpty().withMessage("Title is required"),
    ];
};



/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * Express Validator logic
 */
const validate = (req, res, next) => {

    const errors = validationResult(req);

    if (errors.isEmpty()){
        return next();
    }
    const extractedErrors = [];
    errors.array().map( err => extractedErrors.push( err.msg ));

    return res.status(422).json({
        errors: extractedErrors,
    });
};



module.exports = {
    registerValidationRules,
    loginValidationRules,
    validate,
    newPorfileRules,
};