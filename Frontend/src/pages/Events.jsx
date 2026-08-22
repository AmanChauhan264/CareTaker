import { useState } from "react";
import { Link } from "react-router-dom";

function Events() {
  const today = new Date().toISOString().split("T")[0];

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Temple Visit",
      date: "2026-09-15",
      time: "10:00",
      description: "Visit temple with family",
    },
    {
      id: 2,
      title: "Project Submission",
      date: "2026-09-20",
      time: "17:00",
      description: "Submit CARETAKER project",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: today,
    time: "",
    description: "",
  });

  const handleChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value,
    });
  };

  const addEvent = (e) => {
    e.preventDefault();

    if (!newEvent.title.trim()) return;

    const event = {
      id: Date.now(),
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      description: newEvent.description,
    };

    setEvents([...events, event]);

    setNewEvent({
      title: "",
      date: today,
      time: "",
      description: "",
    });

    setShowForm(false);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const formatDate = (date) => {
    return new Date(date + "T00:00:00").toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  const formatTime = (time) => {
    if (!time) return "";

    return new Date(`2000-01-01T${time}`).toLocaleTimeString(
      "en-IN",
      {
        hour: "numeric",
        minute: "2-digit",
      }
    );
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

      {/* Main Content */}
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
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Event
          </button>

        </div>

        {/* Events */}
        <div className="bg-white rounded-xl shadow-sm mt-8 p-6">

          <h3 className="text-xl font-semibold text-slate-800">
            Upcoming Events
          </h3>

          <div className="mt-5 space-y-4">

            {events.length === 0 ? (
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

                        {event.time &&
                          ` • ${formatTime(event.time)}`}
                      </p>

                      {event.description && (
                        <p className="text-sm text-slate-600 mt-2">
                          {event.description}
                        </p>
                      )}
                    </div>

                  </div>

                  <button
                    onClick={() => deleteEvent(event.id)}
                    className="text-red-500 text-sm hover:text-red-700"
                  >
                    Delete
                  </button>

                </div>
              ))
            )}

          </div>
        </div>

        {/* Add Event Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4">

            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">

              <div className="flex justify-between items-center mb-6">

                <h3 className="text-2xl font-bold text-slate-800">
                  Add New Event
                </h3>

                <button
                  onClick={() => setShowForm(false)}
                  className="text-slate-500 text-xl"
                >
                  ✕
                </button>

              </div>

              <form
                onSubmit={addEvent}
                className="space-y-5"
              >

                {/* Title */}
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
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Add Event
                </button>

              </form>

            </div>

          </div>
        )}

      </main>
    </div>
  );
}

export default Events;