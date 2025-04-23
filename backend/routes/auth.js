import express from "express";
const router = express.Router();
import { auth } from "../middleware/auth.js";
import {
  getMe,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/authController.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", auth, getMe);
router.put("/update", auth, updateUser);

export default router;
