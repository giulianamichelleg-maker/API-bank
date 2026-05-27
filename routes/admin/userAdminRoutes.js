import express from "express";
import userController from "../../controllers/userController.js";
import authMiddleware from "../../middleware/authMiddleware.js";
import adminMiddleware from "../../middleware/adminMiddleware.js";
const router = express.Router();


router.get("/",adminMiddleware, authMiddleware, userController.getAllUsers);
router.get("/:id", adminMiddleware, authMiddleware, userController.getUserId);
router.put("/:id", adminMiddleware, authMiddleware, userController.userUpdate);
router.get("/cpf/:cpf", adminMiddleware,authMiddleware, userController.findByCpf);
router.get("/email/:email", adminMiddleware,authMiddleware, userController.findByEmail);
router.get("/:id/accounts", adminMiddleware,authMiddleware, userController.countUsers);

export default router;