import { useTasks } from "../context/TaskContext";

function ReminderPopup() {
  const {
    activeReminder,
    dismissReminder,
    snoozeReminder,
  } = useTasks();

  if (!activeReminder) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl">

        {/* Icon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-3xl">
            🔔
          </div>
        </div>

        {/* Heading */}
        <h2 className="mt-5 text-center text-2xl font-bold text-slate-800">
          CARETAKER Reminder
        </h2>

        <p className="mt-2 text-center text-slate-500">
          It's time to complete your task
        </p>

        {/* Task */}
        <div className="mt-6 rounded-xl bg-slate-50 p-5 text-center">

          <p className="text-lg font-semibold text-slate-800">
            {activeReminder.title}
          </p>

          {activeReminder.time && (
            <p className="mt-2 text-sm text-slate-500">
              Scheduled for{" "}
              {new Date(
                `2000-01-01T${activeReminder.time}`
              ).toLocaleTimeString("en-IN", {
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          )}

        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">

          <button
            onClick={snoozeReminder}
            className="flex-1 rounded-lg bg-slate-100 px-4 py-3 font-medium text-slate-700 hover:bg-slate-200"
          >
            💤 Snooze 5 min
          </button>

          <button
            onClick={dismissReminder}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
          >
            ✓ Done
          </button>

        </div>

      </div>

    </div>
  );
}

export default ReminderPopup;