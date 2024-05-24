const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Function to deliver the account update view
async function buildUpdate(req, res) {
    let nav = await utilities.getNav();
    // Fetch account data from database based on account_id
    const accountData = await accountModel.getAccountById(req.params.accountId);
    res.render("account/update", {
        title: "Update Account",
        nav,
        accountData,
        errors: null,
    });
}

// Function to handle account update process
async function updateAccount(req, res) {
    let nav = await utilities.getNav();
    const { accountId, firstName, lastName, email } = req.body;

    // Server-side validation
    const errors = [];

    if (!firstName || !lastName || !email) {
        errors.push({ msg: "All fields are required." });
    }

    if (errors.length > 0) {
        // Return to update view for correction if errors are found
        res.status(400).render("account/update", {
            title: "Update Account",
            nav,
            accountData: req.body,
            errors,
        });
        return;
    }

    // Update account information in the database
    const updateResult = await accountModel.updateAccount(accountId, firstName, lastName, email);

    if (updateResult) {
        req.flash("notice", "Account information updated successfully.");
        // Deliver the management view where the updated account information will be displayed
        res.redirect("/account/management");
    } else {
        req.flash("notice", "Failed to update account information.");
        res.redirect("/account/management");
    }
}

// Function to handle password change process
async function changePassword(req, res) {
    let nav = await utilities.getNav();
    const { accountId, newPassword } = req.body;

    // Server-side validation for new password
    const errors = [];

    if (!newPassword || newPassword.length < 8) {
        errors.push({ msg: "Password must be at least 8 characters long." });
    }
    // Add more validation rules for password if needed

    if (errors.length > 0) {
        // Return to update view for correction if errors are found
        res.status(400).render("account/update", {
            title: "Update Account",
            nav,
            accountData: req.body,
            errors,
        });
        return;
    }

    try {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // Update password in the database
        const updateResult = await accountModel.updatePassword(accountId, hashedPassword);

        if (updateResult) {
            req.flash("notice", "Password changed successfully.");
            // Deliver the management view where the account information will be displayed
            res.redirect("/account/management");
        } else {
            req.flash("notice", "Failed to change password.");
            res.redirect("/account/management");
        }
    } catch (error) {
        console.error("Error changing password:", error);
        req.flash("notice", "Failed to change password.");
        res.redirect("/account/management");
    }
}

module.exports = { buildLogin, buildRegister, buildUpdate, updateAccount, changePassword };