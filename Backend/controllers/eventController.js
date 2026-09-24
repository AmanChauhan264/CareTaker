import mongoose from "mongoose";
import Event from "../models/Event.js";

// @desc    Get all events for the logged in user
// @route   GET /api/events
// @access  Private
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ user: req.user._id }).sort({
      date: 1,
      time: 1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    console.error("GetEvents Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve events.",
    });
  }
};

// @desc    Create a new event
// @route   POST /api/events
// @access  Private
export const createEvent = async (req, res) => {
  try {
    const { title, date, time, description } = req.body;

    const trimmedTitle = (title || "").trim();
    const trimmedDate = (date || "").trim();

    if (!trimmedTitle) {
      return res.status(400).json({
        success: false,
        message: "Event title is required.",
      });
    }

    if (!trimmedDate) {
      return res.status(400).json({
        success: false,
        message: "Event date is required.",
      });
    }

    const event = await Event.create({
      user: req.user._id,
      title: trimmedTitle,
      date: trimmedDate,
      time: (time || "").trim(),
      description: (description || "").trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully.",
      event,
    });
  } catch (error) {
    console.error("CreateEvent Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create event.",
    });
  }
};

// @desc    Update an event (user owned only)
// @route   PUT /api/events/:id
// @access  Private
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    const event = await Event.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    const { title, date, time, description } = req.body;

    if (title !== undefined) {
      const trimmedTitle = title.trim();
      if (!trimmedTitle) {
        return res.status(400).json({
          success: false,
          message: "Event title cannot be empty.",
        });
      }
      event.title = trimmedTitle;
    }

    if (date !== undefined) {
      const trimmedDate = date.trim();
      if (!trimmedDate) {
        return res.status(400).json({
          success: false,
          message: "Event date cannot be empty.",
        });
      }
      event.date = trimmedDate;
    }

    if (time !== undefined) {
      event.time = time.trim();
    }

    if (description !== undefined) {
      event.description = description.trim();
    }

    await event.save();

    return res.status(200).json({
      success: true,
      message: "Event updated successfully.",
      event,
    });
  } catch (error) {
    console.error("UpdateEvent Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update event.",
    });
  }
};

// @desc    Delete an event (user owned only)
// @route   DELETE /api/events/:id
// @access  Private
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    const event = await Event.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event deleted successfully.",
      id,
    });
  } catch (error) {
    console.error("DeleteEvent Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete event.",
    });
  }
};
