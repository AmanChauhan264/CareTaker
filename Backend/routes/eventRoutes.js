import express from "express";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect all event endpoints
router.use(protect);

router.route("/").get(getEvents).post(createEvent);
router.route("/:id").put(updateEvent).delete(deleteEvent);

export default router;
