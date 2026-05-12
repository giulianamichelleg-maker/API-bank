import express from "express";
import transactionController from "../controllers/transactionController.js";
const router = express.Router();

router.get("/", transactionController.transactionsFind);
export default router;