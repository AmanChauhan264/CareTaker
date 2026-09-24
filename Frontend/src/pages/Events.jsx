import { useState } from "react";
import { Link } from "react-router-dom";
import { useEvents } from "../context/EventContext";

function Events() {
  const now = new Date();
  const today =
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0");

  const {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    loading,
    error,
  } = useEvents();

  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: today,
    time: "",
    description: "",
  });

  // Input change
  const handleChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });
    setFormError("");
  };

  // Add event
  const handleAddEvent = async (e) => {
    e.preventDefault();

    if (!newEvent.title.trim()) {
      return setFormError("Event name is required");
    }

    setSubmitting(true);
    setFormError("");

    try {
      await addEvent({
        title: newEvent.title.trim(),
        date: newEvent.date,
        time: newEvent.time,
        description: newEvent.description,
      });
      resetForm();
    } catch (err) {
      setFormError(
        err.response?.data?.message || "Failed to create event. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Start editing
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setFormError("");

    setNewEvent({
      title: event.title,
      date: event.date,
      time: event.time || "",
      description: event.description || "",
    });

    setShowForm(true);
  };

  // Update event
  const handleUpdateEvent = async (e) => {
    e.preventDefault();

    if (!newEvent.title.trim()) {
      return setFormError("Event name is required");
    }

    setSubmitting(true);
    setFormError("");

    try {
      await updateEvent(editingEvent.id, {
        title: newEvent.title.trim(),
        date: newEvent.date,
        time: newEvent.time,
        description: newEvent.description,
      });
      resetForm();
    } catch (err) {
      setFormError(
        err.response?.data?.message || "Failed to update event. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setNewEvent({
      title: "",
      date: today,
      time: "",
      description: "",
    });

    setEditingEvent(null);
    setFormError("");
    setSubmitting(false);
    setShowForm(false);
  };

  // Format date
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(
      date + "T00:00:00"
    ).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
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
            className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            Tasks
          </Link>

          <Link
            to="/events"
            className="block px-4 py-3 rounded-lg bg-blue-50 text-blue-600 font-medium"
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
              My Events
            </h2>

            <p className="text-slate-500 mt-1">
              Keep track of important dates and plans.
            </p>
          </div>

          <button
            onClick={() => {
              setEditingEvent(null);
              setFormError("");
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Event
          </button>

        </div>

        {/* Global Error Banner if any */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mt-6 text-sm">
            {error}
          </div>
        )}

        {/* Event List */}
        <div className="bg-white rounded-xl shadow-sm mt-8 p-6">

          <h3 className="text-xl font-semibold text-slate-800">
            Upcoming Events
          </h3>

          <div className="mt-5 space-y-4">

            {loading ? (
              <p className="text-slate-500 text-center py-6">
                Loading events...
              </p>
            ) : events.length === 0 ? (
              <p className="text-slate-500 text-center py-6">
                No events added yet.
              </p>
            ) : (
              events.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-5 rounded-lg bg-slate-50"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">
                      📅
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-800">
                        {event.title}
                      </h4>

                      <p className="text-sm text-slate-500 mt-1">
                        {formatDate(event.date)}
                        {event.time && ` • ${formatTime(event.time)}`}
                      </p>

                      {event.description && (
                        <p className="text-sm text-slate-600 mt-2">
                          {event.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        handleEditEvent(event)
                      }
                      className="text-blue-600 text-sm hover:text-blue-800"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteEvent(event.id)
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

        {/* Add / Edit Event Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">

              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-slate-800">
                  {editingEvent
                    ? "Edit Event"
                    : "Add New Event"}
                </h3>

                <button
                  onClick={resetForm}
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
                  editingEvent
                    ? handleUpdateEvent
                    : handleAddEvent
                }
                className="space-y-5"
              >
                {/* Event Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Event Name
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={newEvent.title}
                    onChange={handleChange}
                    placeholder="What is the event?"
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
                    value={newEvent.date}
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
                    value={newEvent.time}
                    onChange={handleChange}
                    disabled={submitting}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-50"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Description
                  </label>

                  <textarea
                    name="description"
                    value={newEvent.description}
                    onChange={handleChange}
                    placeholder="Add some details..."
                    rows="3"
                    disabled={submitting}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:bg-slate-50"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={resetForm}
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
                      : editingEvent
                      ? "Save Changes"
                      : "Add Event"}
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

export default Events;