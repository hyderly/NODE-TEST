import express from "express";
const router = express.Router();

// Controllers
import { registerUser, authUser } from "../controllers/userController.js";

router.post("/register", registerUser);
router.post("/login", authUser);

export default router;
