import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();


router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserId);
router.put("/:id", userController.userUpdate);
router.delete("/:id", userController.deleteUser);
router.get("/cpf/:cpf", userController.findByCpf);
router.get("/email/:email", userController.findByEmail);
router.get("/:id/accounts", userController.countUsers);
router.get("/me/auth", authMiddleware, userController.getMe)
export default router;