import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
const router = express.Router();


router.get("/",adminMiddleware, authMiddleware, userController.getAllUsers);
router.get("/:id", adminMiddleware, authMiddleware, userController.getUserId);
router.put("/:id", authMiddleware, userController.userUpdate);
router.delete("/:id", authMiddleware, userController.deleteUser);
router.get("/cpf/:cpf", authMiddleware, userController.findByCpf);
router.get("/email/:email", authMiddleware, userController.findByEmail);
router.get("/:id/accounts", authMiddleware, userController.countUsers);
router.get("/me/auth", authMiddleware, userController.getMe);
router.put("/me/auth", authMiddleware, userController.updateMe);



export default router;