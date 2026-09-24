import { useState } from "react";
import { requestNotificationPermission } from "../services/reminderService";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

function Tasks() {
  const now = new Date();
  const today =
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0");

  const {
    tasks,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    loading,
    error,
  } = useTasks();

  const [notificationStatus, setNotificationStatus] = useState(
    "Notification" in window
      ? Notification.permission
      : "unsupported"
  );

  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const [newTask, setNewTask] = useState({
    title: "",
    date: today,
    time: "",
  });

  // Enable notifications
  const enableNotifications = async () => {
    const granted =
      await requestNotificationPermission();

    setNotificationStatus(
      granted
        ? "granted"
        : Notification.permission
    );
  };

  // Input change
  const handleChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
    setFormError("");
  };

  // Close form
  const closeForm = () => {
    setShowForm(false);
    setEditingTask(null);
    setFormError("");
    setSubmitting(false);

    setNewTask({
      title: "",
      date: today,
      time: "",
    });
  };

  // Add task
  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!newTask.title.trim()) {
      return setFormError("Task name is required");
    }

    setSubmitting(true);
    setFormError("");

    try {
      await addTask({
        title: newTask.title.trim(),
        date: newTask.date,
        time: newTask.time,
      });
      closeForm();
    } catch (err) {
      setFormError(
        err.response?.data?.message || "Failed to create task. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Start editing
  const handleEditTask = (task) => {
    setEditingTask(task);
    setFormError("");

    setNewTask({
      title: task.title,
      date: task.date,
      time: task.time || "",
    });

    setShowForm(true);
  };

  // Update task
  const handleUpdateTask = async (e) => {
    e.preventDefault();

    if (!newTask.title.trim() || !editingTask) {
      return setFormError("Task name is required");
    }

    setSubmitting(true);
    setFormError("");

    try {
      await updateTask(editingTask.id, {
        title: newTask.title.trim(),
        date: newTask.date,
        time: newTask.time,
      });
      closeForm();
    } catch (err) {
      setFormError(
        err.response?.data?.message || "Failed to update task. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  // Format date
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(
      date + "T00:00:00"
    ).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Format time
  const formatTime = (time) => {
    if (!time) return "";

    return new Date(
      `2000-01-01T${time}`
    ).toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6">

        <h1 className="text-2xl font-bold text-blue-600">
          CARETAKER
        </h1>

        <nav className="mt-10 space-y-3">

          <Link
            to="/dashboard"
            className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            Dashboard
          </Link>

          <Link
            to="/tasks"
            className="block px-4 py-3 rounded-lg bg-blue-50 text-blue-600 font-medium"
          >
            Tasks
          </Link>

          <Link
            to="/events"
            className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            Events
          </Link>

          <Link
            to="/analytics"
            className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            Analytics
          </Link>

          <Link
            to="/settings"
            className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            Settings
          </Link>

        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              My Tasks
            </h2>

            <p className="text-slate-500 mt-1">
              Manage everything you need to get done.
            </p>
          </div>

          <div className="flex gap-3">

            {notificationStatus !== "granted" && (
              <button
                onClick={enableNotifications}
                className="bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition"
              >
                🔔 Enable Notifications
              </button>
            )}

            <button
              onClick={() => {
                setEditingTask(null);
                setFormError("");
                setNewTask({
                  title: "",
                  date: today,
                  time: "",
                });
                setShowForm(true);
              }}
              className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              + Add Task
            </button>

          </div>
        </div>

        {/* Global Error Banner if any */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mt-6 text-sm">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mt-8 flex gap-3">

          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg ${
              filter === "all"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-lg ${
              filter === "pending"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            Pending
          </button>

          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-2 rounded-lg ${
              filter === "completed"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            Completed
          </button>

        </div>

        {/* Task List */}
        <div className="bg-white rounded-xl shadow-sm mt-6 p-6">

          <h3 className="text-xl font-semibold text-slate-800">
            {filter === "all"
              ? "All Tasks"
              : filter === "pending"
              ? "Pending Tasks"
              : "Completed Tasks"}
          </h3>

          <div className="mt-5 space-y-3">

            {loading ? (
              <p className="text-slate-500 text-center py-6">
                Loading tasks...
              </p>
            ) : filteredTasks.length === 0 ? (
              <p className="text-slate-500 text-center py-6">
                No tasks found.
              </p>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-50"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() =>
                        toggleTask(task.id)
                      }
                      className="w-4 h-4 cursor-pointer"
                    />

                    <div>
                      <p
                        className={
                          task.completed
                            ? "line-through text-slate-400"
                            : "font-medium text-slate-800"
                        }
                      >
                        {task.title}
                      </p>

                      <p className="text-sm text-slate-500 mt-1">
                        {formatDate(task.date)}
                        {task.time && ` • ${formatTime(task.time)}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        handleEditTask(task)
                      }
                      className="text-blue-600 text-sm hover:text-blue-800"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteTask(task.id)
                      }
                      className="text-red-500 text-sm hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}

          </div>
        </div>

        {/* Add / Edit Task Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">

              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-800">
                  {editingTask
                    ? "Edit Task"
                    : "Add New Task"}
                </h3>

                <button
                  onClick={closeForm}
                  className="text-slate-500 text-xl hover:text-slate-700"
                >
                  ✕
                </button>
              </div>

              {formError && (
                <p className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded">
                  {formError}
                </p>
              )}

              <form
                onSubmit={
                  editingTask
                    ? handleUpdateTask
                    : handleAddTask
                }
                className="space-y-5"
              >
                {/* Task Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Task Name
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={newTask.title}
                    onChange={handleChange}
                    placeholder="What do you need to do?"
                    disabled={submitting}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50"
                    required
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={newTask.date}
                    onChange={handleChange}
                    disabled={submitting}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50"
                    required
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Time
                  </label>

                  <input
                    type="time"
                    name="time"
                    value={newTask.time}
                    onChange={handleChange}
                    disabled={submitting}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeForm}
                    disabled={submitting}
                    className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-lg hover:bg-slate-200 transition font-medium disabled:opacity-60"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-60"
                  >
                    {submitting
                      ? "Saving..."
                      : editingTask
                      ? "Save Changes"
                      : "Add Task"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default Tasks;