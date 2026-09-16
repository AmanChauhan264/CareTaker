import { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";
import { useEvents } from "../context/EventContext";
import {
  requestNotificationPermission,
  triggerReminder,
} from "../services/reminderService";

function ReminderManager() {
  const { tasks } = useTasks();
  const { events } = useEvents();

  const [reminder, setReminder] = useState(null);

  // Ask notification permission
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  // Check tasks and events
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();

      const currentDate =
        now.getFullYear() +
        "-" +
        String(now.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(now.getDate()).padStart(2, "0");

      const currentTime =
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0");

      // =========================
      // TASK REMINDERS
      // =========================

      for (const task of tasks) {
        if (task.completed) {
          continue;
        }

        const snoozeKey =
          `snooze_task_${task.id}`;

        const snoozeUntil =
          localStorage.getItem(snoozeKey);

        // Task is currently snoozed
        if (snoozeUntil) {
          if (Date.now() < Number(snoozeUntil)) {
            continue;
          }

          // Snooze finished
          localStorage.removeItem(snoozeKey);
        }

        if (
          task.date !== currentDate ||
          task.time !== currentTime
        ) {
          continue;
        }

        const reminderKey =
          `task_reminded_${task.id}_${task.date}_${task.time}`;

        if (localStorage.getItem(reminderKey)) {
          continue;
        }

        const reminderData = {
          id: task.id,
          title: task.title,
          date: task.date,
          time: task.time,
          type: "task",
        };

        localStorage.setItem(
          reminderKey,
          "true"
        );

        setReminder(reminderData);

        try {
          triggerReminder(reminderData);
        } catch (error) {
          console.error(
            "Task reminder error:",
            error
          );
        }

        return;
      }

      // =========================
      // EVENT REMINDERS
      // =========================

      for (const event of events) {

        const snoozeKey =
          `snooze_event_${event.id}`;

        const snoozeUntil =
          localStorage.getItem(snoozeKey);

        // Event is currently snoozed
        if (snoozeUntil) {
          if (Date.now() < Number(snoozeUntil)) {
            continue;
          }

          // Snooze finished
          localStorage.removeItem(snoozeKey);
        }

        if (
          event.date !== currentDate ||
          event.time !== currentTime
        ) {
          continue;
        }

        const reminderKey =
          `event_reminded_${event.id}_${event.date}_${event.time}`;

        if (localStorage.getItem(reminderKey)) {
          continue;
        }

        const reminderData = {
          id: event.id,
          title: event.title,
          date: event.date,
          time: event.time,
          description: event.description || "",
          type: "event",
        };

        localStorage.setItem(
          reminderKey,
          "true"
        );

        setReminder(reminderData);

        try {
          triggerReminder(reminderData);
        } catch (error) {
          console.error(
            "Event reminder error:",
            error
          );
        }

        return;
      }
    };

    // Check immediately
    checkReminders();

    // Check every 10 seconds
    const interval = setInterval(
      checkReminders,
      10000
    );

    return () => {
      clearInterval(interval);
    };

  }, [tasks, events]);


  // =========================
  // DONE
  // =========================

  const closeReminder = () => {
    setReminder(null);
  };


  // =========================
  // SNOOZE 5 MINUTES
  // =========================

  const snoozeReminder = () => {
    if (!reminder) {
      return;
    }

    const snoozeKey =
      `snooze_${reminder.type}_${reminder.id}`;

    const snoozeUntil =
      Date.now() + 5 * 60 * 1000;

    localStorage.setItem(
      snoozeKey,
      snoozeUntil.toString()
    );

    setReminder(null);
  };


  // =========================
  // NO REMINDER
  // =========================

  if (!reminder) {
    return null;
  }


  // =========================
  // POPUP
  // =========================

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl">

        <div className="text-center">

          <div className="text-5xl mb-4">
            {reminder.type === "event"
              ? "📅"
              : "🔔"}
          </div>

          <h2 className="text-2xl font-bold text-slate-800">
            {reminder.type === "event"
              ? "Event Reminder"
              : "Task Reminder"}
          </h2>

          <h3 className="mt-3 text-xl font-semibold text-blue-600">
            {reminder.title}
          </h3>

          {reminder.description && (
            <p className="mt-2 text-slate-500">
              {reminder.description}
            </p>
          )}

          <p className="mt-3 text-sm text-slate-500">
            Scheduled for {reminder.time}
          </p>

        </div>

        <div className="mt-6 flex gap-3">

          <button
            onClick={snoozeReminder}
            className="flex-1 rounded-lg bg-slate-100 px-4 py-3 font-medium text-slate-700 hover:bg-slate-200"
          >
            💤 Snooze 5 min
          </button>

          <button
            onClick={closeReminder}
            className="flex-1 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700"
          >
            ✓ Done
          </button>

        </div>

      </div>

    </div>
  );
}

export default ReminderManager;