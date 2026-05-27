import express from "express";
import userController from "../../controllers/userController.js";
import authMiddleware from "../../middleware/authMiddleware.js";
const router = express.Router();

router.delete("/", authMiddleware, userController.deleteUser);
router.get("/me/auth", authMiddleware, userController.getMe);
router.put("/me/auth", authMiddleware, userController.updateMe);




export default router;