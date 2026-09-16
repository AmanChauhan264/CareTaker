export async function requestNotificationPermission() {
  if (!("Notification" in window)) {
    alert("This browser does not support notifications.");
    return false;
  }

  if (Notification.permission === "granted") {
    return true;
  }

  const permission = await Notification.requestPermission();

  return permission === "granted";
}


export function showNotification(task) {
  if (!("Notification" in window)) {
    return;
  }

  if (Notification.permission !== "granted") {
    console.log("Notification permission:", Notification.permission);
    return;
  }

  const notification = new Notification("CARETAKER Reminder 🔔", {
    body: `It's time to: ${task.title}`,
    icon: "/vite.svg",
  });

  notification.onclick = () => {
    window.focus();
    notification.close();
  };
}


export function playReminderSound() {
  const audio = new Audio(
    "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
  );

  audio.volume = 1.0;

  audio.play().catch((error) => {
    console.log("Sound could not play:", error);
  });
}


export function triggerReminder(task) {
  showNotification(task);
  playReminderSound();
}