// Import necessary modules
const express = require('express');
const router = express.Router();
const { getAccountInfo } = require('../controllers/accountController');
const { someUtilityFunction } = require('../utilities/index');
const regValidate = require('../utilities/account-validation')

// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )

// Define routes
router.get('/', (req, res) => {
    // Handle the GET request for the "My Account" link
    const accountInfo = getAccountInfo();
    const utilityResult = someUtilityFunction();
    res.send(`Account Information: ${accountInfo}. Utility Result: ${utilityResult}`);
    router.post('/register', utilities.handleErrors(accountController.registerAccount))
});

router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement))

// Export the router
module.exports = router;

// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
);