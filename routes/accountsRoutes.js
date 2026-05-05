import express from "express";
import accountsController from "../controllers/accountsController.js";
const router = express.Router();

router.post("/", accountsController.createAccount);

export default router;