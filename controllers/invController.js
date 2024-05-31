const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  try{
    const classification_id = req.params.classificationId;
    const data = await invModel.getInventoryByClassificationId(classification_id);

    if (!data || data.length === 0) {
      throw new Error("No data found for this classification.");
    }

    const grid = await utilities.buildClassificationGrid(data);
    let nav = await utilities.getNav();
    const className = data[0].classification_name;

    res.render("./inventory/classification", {
      title: className + " vehicles",
      nav,
      grid,
    });
  } catch (error) {
    console.error("Error building inventory by classification view:", error);
    next(error);
  }
};

module.exports = invCont

/* ***************************
 *  Return Inventory by Classification As JSON
 * ************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  try {
    const classificationId = parseInt(req.params.classification_id);
    const invData = await invModel.getInventoryByClassificationId(classificationId);
    
    if (!invData || invData.length === 0) {
      throw new Error("No data found for this classification.");
    }

    res.json(invData);
  } catch (error) {
    console.error("Error getting inventory JSON:", error);
    next(error);
  }
};

module.exports = invCount;