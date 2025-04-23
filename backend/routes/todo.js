import express from "express";
const router = express.Router();
import {
  addTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  toggleStatus,
} from "../controllers/todoController.js";
import { auth } from "../middleware/auth.js";

router.use(auth);

router.post("/", addTodo);
router.get("/", getTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id/status", toggleStatus);

export default router;
