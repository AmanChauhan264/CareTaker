import { Link, useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { useEvents } from "../context/EventContext";
import { useAuth } from "../context/AuthContext";

function Settings() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { tasks, deleteTask } = useTasks();
  const { events, deleteEvent } = useEvents();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleClearTasks = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all tasks?"
    );

    if (!confirmDelete) return;

    try {
      await Promise.all(tasks.map((task) => deleteTask(task.id)));
    } catch (err) {
      console.error("Failed to delete all tasks:", err);
    }
  };

  const handleClearEvents = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all events?"
    );

    if (!confirmDelete) return;

    try {
      await Promise.all(events.map((event) => deleteEvent(event.id)));
    } catch (err) {
      console.error("Failed to delete all events:", err);
    }
  };

  const handleClearReminders = () => {
    const confirmDelete = window.confirm(
      "Clear all reminder history?"
    );

    if (!confirmDelete) return;

    Object.keys(localStorage).forEach((key) => {
      if (
        key.startsWith("task_reminded_") ||
        key.startsWith("event_reminded_") ||
        key.startsWith("snooze_")
      ) {
        localStorage.removeItem(key);
      }
    });

    alert("Reminder history cleared.");
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
            className="block px-4 py-3 rounded-lg bg-blue-50 text-blue-600 font-medium"
          >
            Settings
          </Link>

        </nav>

      </aside>


      {/* Main Content */}

      <main className="flex-1 p-8">

        {/* Header */}

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Settings
          </h2>

          <p className="text-slate-500 mt-1">
            Manage your CARETAKER application.
          </p>

        </div>


        {/* Account Information */}
        <div className="bg-white rounded-xl shadow-sm mt-8 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-semibold text-slate-800">
                Account Information
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                Your profile credentials in CARETAKER.
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-100 transition font-medium text-sm"
            >
              Log Out
            </button>
          </div>

          <div className="mt-5 space-y-4">
            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
              <span className="text-slate-600">Full Name</span>
              <span className="font-semibold text-slate-800">
                {user?.name || "User"}
              </span>
            </div>

            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">
              <span className="text-slate-600">Email Address</span>
              <span className="font-medium text-slate-800">
                {user?.email || "Not available"}
              </span>
            </div>
          </div>
        </div>

        {/* Application Information */}
        <div className="bg-white rounded-xl shadow-sm mt-6 p-6">

          <h3 className="text-xl font-semibold text-slate-800">
            Application Information
          </h3>

          <div className="mt-5 space-y-4">

            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">

              <span className="text-slate-600">
                Application
              </span>

              <span className="font-medium text-slate-800">
                CARETAKER
              </span>

            </div>

            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">

              <span className="text-slate-600">
                Total Tasks
              </span>

              <span className="font-medium text-blue-600">
                {tasks.length}
              </span>

            </div>

            <div className="flex justify-between items-center p-4 bg-slate-50 rounded-lg">

              <span className="text-slate-600">
                Total Events
              </span>

              <span className="font-medium text-blue-600">
                {events.length}
              </span>

            </div>

          </div>

        </div>


        {/* Reminder Settings */}

        <div className="bg-white rounded-xl shadow-sm mt-6 p-6">

          <h3 className="text-xl font-semibold text-slate-800">
            Reminder Settings
          </h3>

          <p className="text-slate-500 mt-2">
            Manage reminder history stored by CARETAKER.
          </p>

          <button
            onClick={handleClearReminders}
            className="mt-5 bg-slate-100 text-slate-700 px-5 py-3 rounded-lg hover:bg-slate-200 transition"
          >
            Clear Reminder History
          </button>

        </div>


        {/* Data Management */}

        <div className="bg-white rounded-xl shadow-sm mt-6 p-6">

          <h3 className="text-xl font-semibold text-slate-800">
            Data Management
          </h3>

          <p className="text-slate-500 mt-2">
            Manage your tasks and events data in CARETAKER.
          </p>


          {/* Clear Tasks */}

          <div className="flex items-center justify-between mt-6 p-4 bg-slate-50 rounded-lg">

            <div>

              <h4 className="font-medium text-slate-800">
                Delete All Tasks
              </h4>

              <p className="text-sm text-slate-500 mt-1">
                Permanently remove all saved tasks.
              </p>

            </div>

            <button
              onClick={handleClearTasks}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>

          </div>


          {/* Clear Events */}

          <div className="flex items-center justify-between mt-4 p-4 bg-slate-50 rounded-lg">

            <div>

              <h4 className="font-medium text-slate-800">
                Delete All Events
              </h4>

              <p className="text-sm text-slate-500 mt-1">
                Permanently remove all saved events.
              </p>

            </div>

            <button
              onClick={handleClearEvents}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>

          </div>

        </div>


        {/* About */}

        <div className="bg-white rounded-xl shadow-sm mt-6 p-6">

          <h3 className="text-xl font-semibold text-slate-800">
            About CARETAKER
          </h3>

          <p className="text-slate-500 mt-3 leading-relaxed">
            CARETAKER is a personal task and event management
            application designed to help you organize daily
            responsibilities, upcoming events, and reminders
            in one place.
          </p>

          <p className="text-sm text-slate-400 mt-4">
            Version 1.0
          </p>

        </div>

      </main>

    </div>
  );
}

export default Settings;