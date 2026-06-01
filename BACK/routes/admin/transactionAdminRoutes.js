import express from "express";
import transactionController from "../../controllers/transactionController.js";
import authMiddleware from "../../middleware/authMiddleware.js";
import adminMiddleware from "../../middleware/adminMiddleware.js";
const router = express.Router();

router.get("/:id", adminMiddleware, authMiddleware, transactionController.transactionForId);
router.get("/", adminMiddleware, authMiddleware, transactionController.transactionsFind);

export default router;