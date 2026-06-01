import express from "express";
import transactionController from "../../controllers/transactionController.js";
import authMiddleware from "../../middleware/authMiddleware.js";
const router = express.Router();



router.get("/type/:type", authMiddleware, transactionController.transactionType);
router.get("/value/:min/:max", authMiddleware, transactionController.transactionMinMax);
router.get("/year/:year", authMiddleware, transactionController.transactionYear);
export default router;
