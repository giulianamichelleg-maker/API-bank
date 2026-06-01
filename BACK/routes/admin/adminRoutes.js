import express from "express";
import adminController from "../../controllers/adminController.js";
import adminMiddleware from "../../middleware/adminMiddleware.js";
import authMiddleware from "../../middleware/authMiddleware.js";
const router = express.Router();

router.get("/users/active", adminMiddleware, authMiddleware, adminController.adminUserActive);
router.get("/users/inactive", adminMiddleware, authMiddleware, adminController.adminUserInactive);
router.patch("/users/:id/activate", adminMiddleware, authMiddleware, adminController.adminUpdateUser);
router.patch("/users/:id/desactivate", adminMiddleware, authMiddleware, adminController.adminUpdateDesactivate);
router.get("/accounts/active", adminMiddleware, authMiddleware, adminController.getAccountsActive);
router.get("/accounts/inactive", adminMiddleware, authMiddleware, adminController.getAccountsInactive);
router.patch("/accounts/:id/block", adminMiddleware, authMiddleware, adminController.accountsUpdateBlock);
router.patch("/accounts/:id/unblock", adminMiddleware, authMiddleware, adminController.accountsUpdateUnblock);
router.patch("/accounts/:id/close", adminMiddleware, authMiddleware, adminController.accountClose);
router.post("/accounts/:id/monthly-fee", adminMiddleware, authMiddleware, adminController.accountFee);
router.post("/transactions/:id/refund", adminMiddleware, authMiddleware, adminController.accountRefund);
router.get("/reports/general", adminMiddleware, authMiddleware, adminController.reportsGeneral);
router.get("/reports/financial", adminMiddleware, authMiddleware, adminController.reportsFinancial);
router.get("/accounts/negative-balance", adminMiddleware, authMiddleware, adminController.negativeBalanceAccounts);
router.get("/accounts/top-balance/:limit", adminMiddleware, authMiddleware, adminController.topBalances);



export default router;