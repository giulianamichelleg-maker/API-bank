import express from "express";
import userController from "../../controllers/userController.js";
import authMiddleware from "../../middleware/authMiddleware.js";
import adminMiddleware from "../../middleware/adminMiddleware.js";
const router = express.Router();

router.get("/", adminMiddleware, transactionController.transactionsFind);
router.get("/",adminMiddleware, authMiddleware, userController.getAllUsers);
router.get("/:id", adminMiddleware, authMiddleware, userController.getUserId);
router.put("/:id", adminMiddleware, authMiddleware, userController.userUpdate);