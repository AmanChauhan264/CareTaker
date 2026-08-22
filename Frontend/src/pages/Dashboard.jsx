import { useState } from "react";

function getToday() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function Dashboard() {
  const today = getToday();

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
    {
      id: 4,
      title: "Read for 30 minutes",
      date: today,
      time: "22:00",
      completed: false,
    },
  ]);

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

    if (!newTask.title.trim()) {
      return;
    }

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

  const todayTasks = tasks.filter((task) => task.date === today);

  const upcomingTasks = tasks.filter((task) => task.date > today);

  const completedTasks = tasks.filter(
    (task) => task.completed
  );

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
          <button className="w-full text-left px-4 py-3 rounded-lg bg-blue-50 text-blue-600 font-medium">
            Dashboard
          </button>

          <button className="w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100">
            Tasks
          </button>

          <button className="w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100">
            Events
          </button>

          <button className="w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100">
            Analytics
          </button>

          <button className="w-full text-left px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100">
            Settings
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Good Evening 👋
            </h2>

            <p className="text-slate-500 mt-1">
              Here's what's happening today.
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Task
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-slate-500">
              Today's Tasks
            </p>

            <h3 className="text-3xl font-bold text-slate-800 mt-2">
              {todayTasks.length}
            </h3>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-slate-500">
              Completed
            </p>

            <h3 className="text-3xl font-bold text-green-600 mt-2">
              {completedTasks.length}
            </h3>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-slate-500">
              Upcoming Tasks
            </p>

            <h3 className="text-3xl font-bold text-blue-600 mt-2">
              {upcomingTasks.length}
            </h3>
          </div>

        </div>

        {/* Today's Tasks */}
        <div className="bg-white rounded-xl p-6 shadow-sm mt-8">

          <h3 className="text-xl font-semibold text-slate-800">
            Today's Tasks
          </h3>

          <div className="mt-5 space-y-4">

            {todayTasks.length === 0 ? (
              <p className="text-slate-500">
                No tasks for today.
              </p>
            ) : (
              todayTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between border-b pb-3"
                >

                  <div className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-4 h-4"
                    />

                    <span
                      className={
                        task.completed
                          ? "line-through text-slate-400"
                          : "text-slate-700"
                      }
                    >
                      {task.title}
                    </span>

                  </div>

                  <div className="flex items-center gap-4">

                    {task.time && (
                      <span className="text-sm text-slate-400">
                        {formatTime(task.time)}
                      </span>
                    )}

                    <button
                      onClick={() => deleteTask(task.id)}
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

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-xl p-6 shadow-sm mt-8">

          <h3 className="text-xl font-semibold text-slate-800">
            Upcoming Tasks
          </h3>

          <div className="mt-5 space-y-4">

            {upcomingTasks.length === 0 ? (
              <p className="text-slate-500">
                No upcoming tasks.
              </p>
            ) : (
              upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between border-b pb-4"
                >

                  <div className="flex items-center gap-3">

                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="w-4 h-4"
                    />

                    <div>
                      <h4
                        className={
                          task.completed
                            ? "line-through text-slate-400"
                            : "font-medium text-slate-800"
                        }
                      >
                        {task.title}
                      </h4>

                      <p className="text-sm text-slate-500">
                        {formatDate(task.date)}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-4">

                    {task.time && (
                      <span className="text-sm text-blue-600">
                        {formatTime(task.time)}
                      </span>
                    )}

                    <button
                      onClick={() => deleteTask(task.id)}
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

        {/* Add Task Form */}
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

export default Dashboard;