import express from "express";
import transactionController from "../../controllers/transactionController.js";
import authMiddleware from "../../middleware/authMiddleware.js";
const router = express.Router();

router.get("/:id", adminMiddleware, authMiddleware, transactionController.transactionForId);