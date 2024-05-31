// Import necessary modules
const express = require('express');
const router = express.Router();
const { getAccountInfo, registerAccount, accountLogin, buildManagement } = require('../controllers/accountController');
const { someUtilityFunction } = require('../utilities/index');
const regValidate = require('../utilities/account-validation');

// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    registerAccount
);

// Process the login attempt
router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    accountLogin
);

// Define routes
router.get('/', (req, res) => {
    // Handle the GET request for the "My Account" link
    const accountInfo = getAccountInfo(); // Assuming getAccountInfo returns account information
    const utilityResult = someUtilityFunction(); // Assuming someUtilityFunction returns utility result
    res.send(`Account Information: ${accountInfo}. Utility Result: ${utilityResult}`);
});

router.get("/", buildManagement);

// Export the router
module.exports = router;
