import express from "express";
import accountsController from "../../controllers/accountsController.js";
import authMiddleware from "../../middleware/authMiddleware.js";
const router = express.Router();



router.put("/",authMiddleware, accountsController.accountUpdate);

router.get("/balance", authMiddleware, accountsController.accountBalance);
router.post("/deposit", authMiddleware, accountsController.accountDeposit);
router.post("/withdraw", authMiddleware, accountsController.accountWithdraw);
router.post("/transfer", authMiddleware, accountsController.accountTransfer);
router.get("/statement", authMiddleware, accountsController.accountsStatement);
router.post("/withdraw/simulate", authMiddleware, accountsController.accountWithdrawSimulate);
router.post("/transfer/simulate", authMiddleware, accountsController.accountTransferSimulate);
router.get("/me/balance", authMiddleware, accountsController.accountBalance);


export default router;











