import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect all task endpoints
router.use(protect);

router.route("/").get(getTasks).post(createTask);
router.route("/:id").put(updateTask).delete(deleteTask);
router.route("/:id/toggle").patch(toggleTask);

export default router;
