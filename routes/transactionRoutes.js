import express from "express";
import transactionController from "../controllers/transactionController.js";
const router = express.Router();

router.get("/", transactionController.transactionsFind);
router.get("/:id", transactionController.transactionForId);
router.get("/type/:type", transactionController.transactionType);
router.get("/value/:min/:max", transactionController.transactionMinMax);
router.get("/year/:year", transactionController.transactionYear);
export default router;