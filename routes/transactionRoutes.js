import express from "express";
import transactionController from "../controllers/transactionController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
const router = express.Router();

router.get("/", adminMiddleware, transactionController.transactionsFind);
router.get("/:id", authMiddleware, transactionController.transactionForId);
router.get("/type/:type", authMiddleware, transactionController.transactionType);
router.get("/value/:min/:max", authMiddleware, transactionController.transactionMinMax);
router.get("/year/:year", authMiddleware, transactionController.transactionYear);
export default router;
