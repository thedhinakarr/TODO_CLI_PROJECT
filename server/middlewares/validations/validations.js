/* A file for custom validations in JS. VERY IMPORTANT FOR LOGINS, REGIS?tRATIONS,etc. */

import { body, validationResult } from "express-validator";

//NOW THE FUN BEGINS.

function userRegistrationValidation() {
    return [
        body(`username`, `Username is required`).notEmpty().isLength({ min: 3 }),
        body(`email`, `Email is required`).isEmail(),
        body(`phone`, `Phone is requored`).isMobilePhone(),
        body('location', `Location is required`).notEmpty(),
        body(`password`, `Password must be strong`).isStrongPassword(),
        /* All the above ones are functionalities provided by express validators. */

        body('password2').custom((value, { req }) => {
            if (value != req.body.password) {
                throw new Error(`Passwords do not match.`)
            }
            return true;
        })
        /* 
            This specific validation, is a custom validation, 
            checks if the value of the password2 key matches with the request 
            object's password.
        */
    ]
    /* Note, when this function is invoked, returns an array. */
}

function userLoginValidations() {
    return [
        body(`email`, "Email is required").isEmail(),
        body(`password`, `Password is required`).notEmpty()
    ]
}

/* ERROR MIDDLEWARE... The callback function which will be called when
 the validator functions return an array of errors. */

function errorMiddleWare(req, res, next) {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    return next();
}


export {userRegistrationValidation, userLoginValidations , errorMiddleWare }