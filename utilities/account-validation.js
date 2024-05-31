const pool = require("../database/index");
const accountModel = require("../models/account-model");
const utilities = require("."); // Assuming this is the correct path

const { body, validationResult } = require("express-validator");
const validate = {};

/* **********************************
 *  Registration Data Validation Rules
 * ********************************* */
validate.registrationRules = () => {
    return [
        // Validate email format and check if it already exists in the database
        body("account_email")
            .trim()
            .isEmail()
            .normalizeEmail()
            .withMessage("A valid email is required.")
            .custom(async (account_email) => {
                const emailExists = await accountModel.checkExistingEmail(account_email);
                if (emailExists) {
                    throw new Error("Email already exists. Please log in or use a different email.");
                }
            }),

        // Validate lastname: required, minimum length, and escaped
        body("account_lastname")
            .trim()
            .notEmpty()
            .isLength({ min: 2 })
            .escape()
            .withMessage("Please provide a last name."),

        // Validate password strength: required and strong password criteria
        body("account_password")
            .trim()
            .notEmpty()
            .isStrongPassword({
                minLength: 12,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,
            })
            .withMessage("Password does not meet requirements."),
    ];
};

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
    const { account_firstname, account_lastname, account_email } = req.body;
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        const nav = await utilities.getNav(); // Assuming getNav returns navigation links
        return res.render("account/register", {
            errors: errors.array(),
            title: "Registration",
            nav,
            account_firstname,
            account_lastname,
            account_email,
        });
    }
    next();
};

module.exports = validate;