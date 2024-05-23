// Needed Resources 
const express = require("express");
const router = new express.Router(); 
const invController = require("../controllers/invController");

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON));

// GET route for delete confirmation view
router.get("/views/inventory/edit-inventory.ejs", async (req, res, next) => {
    try {
        // Call controller function to handle delete confirmation view
        await inventoryController.showDeleteConfirmation(req, res);
    } catch (error) {
        next(error); // Pass error to Express error handler
    }
});

// POST route handler for delete process
router.post("/views/inventory/edit-inventory.ejs", async (req, res, next) => {
    try {
        // Call controller function to carry out delete process
        await inventoryController.deleteInventory(req, res);
    } catch (error) {
        next(error); // Pass error to Express error handler
    }
});

// Function to deliver delete confirmation view
function showDeleteConfirmation(req, res, next) {
    // Comment indicating the delete confirmation view is being built and delivered
    // Collect the inv_id from the incoming request
    const inv_id = req.params.inv_id;

    // Build the navigation for the new view
    const nav = [{ link: '/views/inventory', text: 'Inventory' }, { link: `/inventory/delete/${inv_id}`, text: 'Delete Confirmation' }];

    // Get the data for the inventory item from the database
    // Using the existing model-based function and sending the inv_id to the function as a parameter
    InventoryModel.findById(inv_id, (err, inv) => {
        if (err) {
            return next(err);
        }
        
        // Build a name variable to hold the inventory item's make and model
        const name = `${inv.make} ${inv.model}`;

        // Call the res.render function to deliver the delete confirmation view
        res.render('inventory/edit-inventory.ejs', {
            title: 'Delete Confirmation',
            nav: nav,
            errors: [],
            inputs: {
                make: inv.make,
                model: inv.model,
                year: inv.year,
                price: inv.price
            },
            inv_id: inv._id
        });
    });
}

module.exports = {
    // Existing controller functions...

    showDeleteConfirmation
};

// Function for carrying out the delete process
function deleteInventory(req, res, next) {
    // Comment indicating the delete is being carried out
    // Collect the inv_id value from the request.body object. Use the parseInt function for the inv_id value during the collection and storage.
    const inv_id = parseInt(req.body.inv_id);

    // Pass the inv_id value to a model-based function to delete the inventory item.
    // You will build the function in the next step of this activity.
    InventoryModel.deleteInventory(inv_id, (err, result) => {
        if (err) {
            // If the delete failed, return a flash failure message to the delete confirmation view,
            // and redirect to the route to rebuild the delete view for the same inventory item.
            req.flash('error', 'Failed to delete inventory item.');
            return res.redirect(`/views/inventory/edit-inventory.ejs`);
        }

        // If the delete was successful, return a flash message to the inventory management view.
        req.flash('success', 'Inventory item deleted successfully.');
        res.redirect('/inventory');
    });
}

module.exports = router;

// END OF LINE