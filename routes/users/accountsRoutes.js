import express from "express";
import accountsController from "../../controllers/accountsController.js";
import authMiddleware from "../../middleware/authMiddleware.js";
const router = express.Router();



router.put("/:id",authMiddleware, accountsController.accountUpdate);

router.get("/:id/balance", authMiddleware, accountsController.accountBalance);
router.post("/:id/deposit", authMiddleware, accountsController.accountDeposit);
router.post("/:id/withdraw", authMiddleware, accountsController.accountWithdraw);
router.post("/transfer", authMiddleware, accountsController.accountTransfer);
router.get("/:id/statement", authMiddleware, accountsController.accountsStatement);
router.post("/:id/withdraw/simulate", authMiddleware, accountsController.accountWithdrawSimulate);
router.post("/transfer/simulate", authMiddleware, accountsController.accountTransferSimulate);
router.get("/me/balance", authMiddleware, accountsController)


export default router;











