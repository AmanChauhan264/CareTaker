import mongoose from "mongoose";
import Task from "../models/Task.js";

// @desc    Get all tasks for the logged in user
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({
      date: 1,
      time: 1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error("GetTasks Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve tasks.",
    });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res) => {
  try {
    const { title, description, date, time, completed, priority } = req.body;

    const trimmedTitle = (title || "").trim();
    const trimmedDate = (date || "").trim();

    if (!trimmedTitle) {
      return res.status(400).json({
        success: false,
        message: "Task title is required.",
      });
    }

    if (!trimmedDate) {
      return res.status(400).json({
        success: false,
        message: "Task date is required.",
      });
    }

    const task = await Task.create({
      user: req.user._id,
      title: trimmedTitle,
      description: (description || "").trim(),
      date: trimmedDate,
      time: (time || "").trim(),
      completed: typeof completed === "boolean" ? completed : false,
      priority: priority || "normal",
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully.",
      task,
    });
  } catch (error) {
    console.error("CreateTask Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create task.",
    });
  }
};

// @desc    Update a task (user owned only)
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    const task = await Task.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    const { title, description, date, time, completed, priority } = req.body;

    if (title !== undefined) {
      const trimmedTitle = title.trim();
      if (!trimmedTitle) {
        return res.status(400).json({
          success: false,
          message: "Task title cannot be empty.",
        });
      }
      task.title = trimmedTitle;
    }

    if (description !== undefined) {
      task.description = description.trim();
    }

    if (date !== undefined) {
      const trimmedDate = date.trim();
      if (!trimmedDate) {
        return res.status(400).json({
          success: false,
          message: "Task date cannot be empty.",
        });
      }
      task.date = trimmedDate;
    }

    if (time !== undefined) {
      task.time = time.trim();
    }

    if (completed !== undefined) {
      task.completed = Boolean(completed);
    }

    if (priority !== undefined) {
      task.priority = priority;
    }

    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task updated successfully.",
      task,
    });
  } catch (error) {
    console.error("UpdateTask Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update task.",
    });
  }
};

// @desc    Delete a task (user owned only)
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    const task = await Task.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
      id,
    });
  } catch (error) {
    console.error("DeleteTask Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete task.",
    });
  }
};

// @desc    Toggle task completed status (user owned only)
// @route   PATCH /api/tasks/:id/toggle
// @access  Private
export const toggleTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    const task = await Task.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found.",
      });
    }

    task.completed = !task.completed;
    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task completion status toggled.",
      task,
    });
  } catch (error) {
    console.error("ToggleTask Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to toggle task completion.",
    });
  }
};
