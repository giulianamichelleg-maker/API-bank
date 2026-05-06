import express from "express";
import accountsController from "../controllers/accountsController.js";
const router = express.Router();

router.post("/", accountsController.createAccount);
router.get("/", accountsController.getAllAccounts);
router.get("/:id", accountsController.getAccountId);
router.put("/:id", accountsController.accountUpdate);
router.get("/number/:accountNumber", accountsController.accountNumber);
router.get("/:id/balance", accountsController.accountBalance);
router.post("/:id/deposit", accountsController.accountDeposit);

export default router;