import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

function Analytics() {
  const { tasks } = useTasks();

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const today = new Date();

  const todayDate =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");

  const todayTasks = tasks.filter(
    (task) => task.date === todayDate
  );

  const todayCompleted = todayTasks.filter(
    (task) => task.completed
  ).length;

  const todayPending = todayTasks.filter(
    (task) => !task.completed
  ).length;

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
            className="block px-4 py-3 rounded-lg bg-blue-50 text-blue-600 font-medium"
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

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Analytics
          </h2>

          <p className="text-slate-500 mt-1">
            Track your task progress and productivity.
          </p>

        </div>


        {/* Statistics */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">

          {/* Total */}

          <div className="bg-white rounded-xl shadow-sm p-6">

            <p className="text-slate-500">
              Total Tasks
            </p>

            <h3 className="text-3xl font-bold text-slate-800 mt-2">
              {totalTasks}
            </h3>

          </div>


          {/* Completed */}

          <div className="bg-white rounded-xl shadow-sm p-6">

            <p className="text-slate-500">
              Completed
            </p>

            <h3 className="text-3xl font-bold text-green-600 mt-2">
              {completedTasks}
            </h3>

          </div>


          {/* Pending */}

          <div className="bg-white rounded-xl shadow-sm p-6">

            <p className="text-slate-500">
              Pending
            </p>

            <h3 className="text-3xl font-bold text-blue-600 mt-2">
              {pendingTasks}
            </h3>

          </div>


          {/* Completion Rate */}

          <div className="bg-white rounded-xl shadow-sm p-6">

            <p className="text-slate-500">
              Completion Rate
            </p>

            <h3 className="text-3xl font-bold text-purple-600 mt-2">
              {completionRate}%
            </h3>

          </div>

        </div>


        {/* Progress Section */}

        <div className="bg-white rounded-xl shadow-sm mt-8 p-6">

          <h3 className="text-xl font-semibold text-slate-800">
            Overall Progress
          </h3>

          <div className="mt-6">

            <div className="flex justify-between mb-2">

              <span className="text-sm text-slate-500">
                Task Completion
              </span>

              <span className="text-sm font-medium text-slate-700">
                {completionRate}%
              </span>

            </div>

            <div className="w-full bg-slate-200 rounded-full h-4">

              <div
                className="bg-blue-600 h-4 rounded-full transition-all duration-500"
                style={{
                  width: `${completionRate}%`,
                }}
              />

            </div>

          </div>

        </div>


        {/* Today's Productivity */}

        <div className="bg-white rounded-xl shadow-sm mt-6 p-6">

          <h3 className="text-xl font-semibold text-slate-800">
            Today's Productivity
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

            {/* Today's Tasks */}

            <div className="bg-slate-50 rounded-lg p-5">

              <p className="text-slate-500">
                Today's Tasks
              </p>

              <h4 className="text-2xl font-bold text-slate-800 mt-2">
                {todayTasks.length}
              </h4>

            </div>


            {/* Today's Completed */}

            <div className="bg-slate-50 rounded-lg p-5">

              <p className="text-slate-500">
                Completed Today
              </p>

              <h4 className="text-2xl font-bold text-green-600 mt-2">
                {todayCompleted}
              </h4>

            </div>


            {/* Today's Pending */}

            <div className="bg-slate-50 rounded-lg p-5">

              <p className="text-slate-500">
                Pending Today
              </p>

              <h4 className="text-2xl font-bold text-blue-600 mt-2">
                {todayPending}
              </h4>

            </div>

          </div>

        </div>


        {/* Task Breakdown */}

        <div className="bg-white rounded-xl shadow-sm mt-6 p-6">

          <h3 className="text-xl font-semibold text-slate-800">
            Task Breakdown
          </h3>

          <div className="mt-6 space-y-5">

            {/* Completed */}

            <div>

              <div className="flex justify-between mb-2">

                <span className="text-sm font-medium text-slate-700">
                  Completed Tasks
                </span>

                <span className="text-sm text-green-600">
                  {completedTasks}
                </span>

              </div>

              <div className="w-full bg-slate-200 rounded-full h-3">

                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-500"
                  style={{
                    width:
                      totalTasks === 0
                        ? "0%"
                        : `${(completedTasks / totalTasks) * 100}%`,
                  }}
                />

              </div>

            </div>


            {/* Pending */}

            <div>

              <div className="flex justify-between mb-2">

                <span className="text-sm font-medium text-slate-700">
                  Pending Tasks
                </span>

                <span className="text-sm text-blue-600">
                  {pendingTasks}
                </span>

              </div>

              <div className="w-full bg-slate-200 rounded-full h-3">

                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{
                    width:
                      totalTasks === 0
                        ? "0%"
                        : `${(pendingTasks / totalTasks) * 100}%`,
                  }}
                />

              </div>

            </div>

          </div>

        </div>


        {/* Empty State */}

        {totalTasks === 0 && (

          <div className="bg-white rounded-xl shadow-sm mt-6 p-8 text-center">

            <p className="text-slate-500">
              No task data available yet.
            </p>

            <Link
              to="/tasks"
              className="inline-block mt-4 bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
            >
              Add Your First Task
            </Link>

          </div>

        )}

      </main>

    </div>
  );
}

export default Analytics;