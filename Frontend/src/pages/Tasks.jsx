import { useState } from "react";
import { Link } from "react-router-dom";

function Tasks() {
  const today = new Date().toISOString().split("T")[0];

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete DSA Practice",
      date: today,
      time: "19:00",
      completed: false,
    },
    {
      id: 2,
      title: "Work on CARETAKER",
      date: today,
      time: "20:00",
      completed: false,
    },
    {
      id: 3,
      title: "Attend College",
      date: today,
      time: "10:00",
      completed: true,
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "",
    date: today,
    time: "",
  });

  const handleChange = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  const addTask = (e) => {
    e.preventDefault();

    if (!newTask.title.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask.title,
      date: newTask.date,
      time: newTask.time,
      completed: false,
    };

    setTasks([...tasks, task]);

    setNewTask({
      title: "",
      date: today,
      time: "",
    });

    setShowForm(false);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;

    return true;
  });

  const formatDate = (date) => {
    return new Date(date + "T00:00:00").toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
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

      {/* Main Content */}
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

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Task
          </button>

        </div>

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

            {filteredTasks.length === 0 ? (
              <p className="text-slate-500 py-6 text-center">
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
                      onChange={() => toggleTask(task.id)}
                      className="w-4 h-4"
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

                        {task.time &&
                          ` • ${formatTime(task.time)}`}
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 text-sm hover:text-red-700"
                  >
                    Delete
                  </button>

                </div>
              ))
            )}

          </div>
        </div>

        {/* Add Task Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4">

            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">

              <div className="flex justify-between items-center mb-6">

                <h3 className="text-2xl font-bold text-slate-800">
                  Add New Task
                </h3>

                <button
                  onClick={() => setShowForm(false)}
                  className="text-slate-500 text-xl"
                >
                  ✕
                </button>

              </div>

              <form
                onSubmit={addTask}
                className="space-y-5"
              >

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
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Date
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={newTask.date}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Time
                  </label>

                  <input
                    type="time"
                    name="time"
                    value={newTask.time}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Add Task
                </button>

              </form>

            </div>

          </div>
        )}

      </main>
    </div>
  );
}

export default Tasks;