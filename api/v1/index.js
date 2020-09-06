const express = require("express");
const {
  createCheckout,
  listCheckouts,
  showAcheckout,
  updateCheckout,
  deleteCheckout,
} = require("../../controllers/checkout");
const {
  createCharge,
  listCharges,
  showAcharge,
  cancelCharge,
  resolveCharge,
} = require("../../controllers/charge");

const router = express.Router();

// checkouts
router.post("/create-checkout", createCheckout);
router.get("/list-checkout", listCheckouts);
router.get("/show-checkout/:checkout_id", showAcheckout);
router.put("/update-checkout/:checkout_id", updateCheckout);
router.delete("/delete-checkout/:checkout_id", deleteCheckout);
// charges
router.post("/create-charge", createCharge);
router.get("/list-charge", listCharges);
router.get("/show-a-charge/:charge_id", showAcharge);
router.post("/cancel-charge/:charge_code", cancelCharge);
router.post("/resolve-charge/:charge_code", resolveCharge);

module.exports = router;
