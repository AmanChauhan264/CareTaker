function Dashboard() {
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
        <h2 className="text-3xl font-bold text-slate-800">
          Good Evening 👋
        </h2>

        <p className="text-slate-500 mt-1">
          Here's what's happening today.
        </p>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-slate-500">Today's Tasks</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-2">
              5
            </h3>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-slate-500">Completed</p>
            <h3 className="text-3xl font-bold text-green-600 mt-2">
              3
            </h3>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <p className="text-slate-500">Upcoming Events</p>
            <h3 className="text-3xl font-bold text-blue-600 mt-2">
              4
            </h3>
          </div>

        </div>

        {/* Today's Tasks */}
        <div className="bg-white rounded-xl p-6 shadow-sm mt-8">

          <h3 className="text-xl font-semibold text-slate-800">
            Today's Tasks
          </h3>

          <div className="mt-5 space-y-4">

            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <span>Complete DSA Practice</span>
              </div>
              <span className="text-sm text-slate-400">
                7:00 PM
              </span>
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <span>Work on CARETAKER</span>
              </div>
              <span className="text-sm text-slate-400">
                8:00 PM
              </span>
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-3">
                <input type="checkbox" defaultChecked />
                <span className="line-through text-slate-400">
                  Attend College
                </span>
              </div>
              <span className="text-sm text-slate-400">
                Completed
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input type="checkbox" />
                <span>Read for 30 minutes</span>
              </div>
              <span className="text-sm text-slate-400">
                10:00 PM
              </span>
            </div>

          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl p-6 shadow-sm mt-8">

          <h3 className="text-xl font-semibold text-slate-800">
            Upcoming Events
          </h3>

          <div className="mt-5 space-y-4">

            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h4 className="font-medium text-slate-800">
                  🛕 Temple Visit
                </h4>
                <p className="text-sm text-slate-500">
                  Plan your visit
                </p>
              </div>

              <span className="text-sm font-medium text-blue-600">
                15 September
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-slate-800">
                  📚 NPTEL Exam
                </h4>
                <p className="text-sm text-slate-500">
                  Exam preparation
                </p>
              </div>

              <span className="text-sm font-medium text-blue-600">
                20 September
              </span>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}

export default Dashboard;