import express from "express";
import adminController from "../controllers/adminController.js";
const router = express.Router();

router.get("/users/active", adminController.adminUserActive)
router.get("/users/inactive", adminController.adminUserInactive);
router.patch("/users/:id/activate", adminController.adminUpdateUser)
router.patch("/users/:id/desactivate", adminController.adminUpdateDesactivate);


export default router;