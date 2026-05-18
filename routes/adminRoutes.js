import express from "express";
import adminController from "../controllers/adminController.js";
const router = express.Router();

router.get("/users/active", adminController.adminUserActive)
router.get("/users/inactive", adminController.adminUserInactive);
router.patch("/users/:id/activate", adminController.adminUpdateUser)
router.patch("/users/:id/desactivate", adminController.adminUpdateDesactivate);
router.get("/accounts/active", adminController.getAccountsActive);
router.get("/accounts/inactive", adminController.getAccountsInactive);
router.patch("/accounts/:id/block", adminController.accountsUpdateBlock);
router.patch("/accounts/:id/unblock", adminController.accountsUpdateUnblock);
router.patch("/accounts/:id/close", adminController.accountClose);
router.post("/accounts/:id/monthly-fee", adminController.accountFee);
router.post("/transactions/:id/refund", adminController.accountRefund);


export default router;