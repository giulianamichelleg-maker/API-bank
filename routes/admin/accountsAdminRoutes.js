import express from "express";
import adminMiddleware from "../../middleware/adminMiddleware.js";
import accountsController from "../../controllers/accountsController.js";
const router = express.Router();

router.get("/", adminMiddleware,authMiddleware, accountsController.getAllAccounts);
router.get("/number/:accountNumber", adminMiddleware, authMiddleware, accountsController.accountNumber);
router.get("/:id", adminMiddleware,authMiddleware, accountsController.getAccountId);