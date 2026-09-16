import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

function Dashboard() {
  const { tasks, toggleTask } = useTasks();

  // Get today's date in local time
  const now = new Date();

  const today =
    now.getFullYear() +
    "-" +
    String(now.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(now.getDate()).padStart(2, "0");

  // Today's tasks
  const todayTasks = tasks.filter(
    (task) => task.date === today
  );

  // Completed tasks
  const completedTasks = tasks.filter(
    (task) => task.completed
  );

  // Pending tasks
  const pendingTasks = tasks.filter(
    (task) => !task.completed
  );

  // Upcoming pending tasks
  const upcomingTasks = tasks
    .filter(
      (task) =>
        task.date > today &&
        !task.completed
    )
    .slice(0, 5);

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

  // Format date
  const formatDate = (date) => {
    return new Date(
      date + "T00:00:00"
    ).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex bg-slate-100">

      {/* ================= SIDEBAR ================= */}

      <aside className="w-64 bg-white border-r border-slate-200 p-6">

        <h1 className="text-2xl font-bold text-blue-600">
          CARETAKER
        </h1>

        <nav className="mt-10 space-y-3">

          <Link
            to="/dashboard"
            className="block px-4 py-3 rounded-lg bg-blue-50 text-blue-600 font-medium"
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
            className="block px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            Settings
          </Link>

        </nav>

      </aside>


      {/* ================= MAIN CONTENT ================= */}

      <main className="flex-1 p-8">

        {/* Header */}

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-3xl font-bold text-slate-800">
              Dashboard
            </h2>

            <p className="text-slate-500 mt-1">
              Welcome back! Here's what's happening today.
            </p>

          </div>

          <Link
            to="/tasks"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Task
          </Link>

        </div>


        {/* ================= STATISTICS ================= */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          {/* Today's Tasks */}

          <div className="bg-white rounded-xl shadow-sm p-6">

            <p className="text-slate-500">
              Today's Tasks
            </p>

            <h3 className="text-3xl font-bold text-slate-800 mt-2">
              {todayTasks.length}
            </h3>

          </div>


          {/* Pending */}

          <div className="bg-white rounded-xl shadow-sm p-6">

            <p className="text-slate-500">
              Pending Tasks
            </p>

            <h3 className="text-3xl font-bold text-blue-600 mt-2">
              {pendingTasks.length}
            </h3>

          </div>


          {/* Completed */}

          <div className="bg-white rounded-xl shadow-sm p-6">

            <p className="text-slate-500">
              Completed Tasks
            </p>

            <h3 className="text-3xl font-bold text-green-600 mt-2">
              {completedTasks.length}
            </h3>

          </div>

        </div>


        {/* ================= TODAY'S TASKS ================= */}

        <div className="bg-white rounded-xl shadow-sm mt-8 p-6">

          <div className="flex items-center justify-between">

            <h3 className="text-xl font-semibold text-slate-800">
              Today's Tasks
            </h3>

            <Link
              to="/tasks"
              className="text-blue-600 text-sm hover:underline"
            >
              View All
            </Link>

          </div>


          <div className="mt-5 space-y-3">

            {todayTasks.length === 0 ? (

              <p className="text-slate-500 text-center py-6">
                No tasks for today.
              </p>

            ) : (

              todayTasks.map((task) => (

                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-50"
                >

                  <div className="flex items-center gap-4">

                    {/* Checkbox */}

                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() =>
                        toggleTask(task.id)
                      }
                      className="w-4 h-4"
                    />


                    {/* Task Information */}

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


                  {/* Status */}

                  <span
                    className={
                      task.completed
                        ? "text-sm text-green-600"
                        : "text-sm text-blue-600"
                    }
                  >
                    {task.completed
                      ? "Completed"
                      : "Pending"}
                  </span>

                </div>

              ))

            )}

          </div>

        </div>


        {/* ================= UPCOMING TASKS ================= */}

        <div className="bg-white rounded-xl shadow-sm mt-6 p-6">

          <div className="flex items-center justify-between">

            <h3 className="text-xl font-semibold text-slate-800">
              Upcoming Tasks
            </h3>

            <Link
              to="/tasks"
              className="text-blue-600 text-sm hover:underline"
            >
              View All
            </Link>

          </div>


          <div className="mt-5 space-y-3">

            {upcomingTasks.length === 0 ? (

              <p className="text-slate-500 text-center py-6">
                No upcoming tasks.
              </p>

            ) : (

              upcomingTasks.map((task) => (

                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-50"
                >

                  <div>

                    <p className="font-medium text-slate-800">
                      {task.title}
                    </p>

                    <p className="text-sm text-slate-500 mt-1">

                      {formatDate(task.date)}

                      {task.time &&
                        ` • ${formatTime(task.time)}`}

                    </p>

                  </div>


                  <span className="text-sm text-blue-600">
                    Pending
                  </span>

                </div>

              ))

            )}

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;